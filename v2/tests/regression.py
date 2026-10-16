"""Pintxo Map 2.1 regression checks for PR #1 review findings R2–R5.
Run: python3 tests/regression.py (Playwright + Chromium required).
Only synthetic data are tested; no human sensory validation is claimed.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
root = Path(__file__).resolve().parents[1]
html=(root/'index.html').read_text().replace('<script defer src="app.js"></script>','').replace('<link rel="stylesheet" href="styles.css">','')
with sync_playwright() as playwright:
    browser=playwright.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--no-proxy-server','--proxy-bypass-list=*'])
    page=browser.new_page(viewport={'width':1365,'height':900},accept_downloads=True)
    errors=[]
    page.on('pageerror',lambda e: errors.append(str(e)))
    page.set_content(html,wait_until='domcontentloaded')
    page.add_style_tag(content=(root/'styles.css').read_text())
    page.add_script_tag(content=(root/'app.js').read_text())
    def js(expr):return page.evaluate(expr)
    def st():return js('PintxoDebug.getState()')
    def benchmark():
        page.locator('#benchmark').click()
        page.wait_for_function('!document.querySelector("#benchmark").disabled && PintxoDebug.getBenchmark() !== null',timeout=120000)
        return js('PintxoDebug.getBenchmark()')
    baseline=benchmark()
    assert baseline['metadata']['version']=='synthetic-2.1-fixed-novrich'
    assert baseline['metadata']['training_holdout_overlap']==0
    assert baseline['metadata']['trials']==12
    assert all(len(row)==5 for group in baseline['rows'].values() for row in group)
    print('PASS benchmark fixed corpus and 0 train/test pair overlap')
    # Arbitrarily change map axes, approvals, tasting mode and votes; synthetic benchmark MUST NOT change.
    page.locator('#axisX').select_option('a')
    page.locator('#grid button:not([disabled])').first.click()
    page.locator('#reject').click()
    page.locator('#runSim').click()
    after=benchmark()
    assert after==baseline, 'benchmark changed after UI / chef review / simulation changes'
    print('PASS benchmark reproducibility independent of chef decisions, map axes and votes')
    # Make two real-mode approvals (not food-safety approvals) and verify repeated pairs flip orientation.
    page.locator('#manualMode').click()
    # If selected recipe was rejected, restore then approve.
    if page.locator('#chefBadge').inner_text()=='Rejected':page.locator('#reject').click()
    page.locator('#reviewNote').fill('Review note A')
    page.locator('#approve').click()
    first=st()['selected']
    for d in page.locator('#grid button:not([disabled])').all():
        d.click()
        if st()['selected']!=first and page.locator('#chefBadge').inner_text()=='Pending':
            page.locator('#reviewNote').fill('Review note B')
            page.locator('#approve').click()
            break
    assert st()['approved']==2
    p1=js('PintxoDebug.getSession("manual").pair.map(x=>x.id)')
    page.locator('#tie').click()
    p2=js('PintxoDebug.getSession("manual").pair.map(x=>x.id)')
    assert p1==p2[::-1],f'pair orientation was not counterbalanced: {p1}, {p2}'
    assert st()['votes']['manual']==1
    print('PASS repeated A/B pair presentation counterbalanced after tie')
    page.locator('#pair button').first.click()
    votes=js('PintxoDebug.getSession("manual").votes')
    assert len(votes)==2 and votes[-1]['approved_at_tasting']=={'A':True,'B':True}
    # Withdraw approval of an explicitly approved candidate after votes.
    withdrawing=js('PintxoDebug.getSession("manual").pair[0]?.id')
    # Prefer the selected dish, which is approved, and use button to withdraw.
    assert page.locator('#chefBadge').inner_text()=='Approved'
    page.locator('#approve').click()
    assert st()['approved']==1 and st()['votes']['manual']==2
    assert js('PintxoDebug.getSession("manual").pair') is None
    print('PASS withdrawal blocks new manual comparisons but preserves historic vote data')
    with page.expect_download() as download:event_page=page.locator('#export').click()
    payload=json.loads(Path(download.value.path()).read_text())
    assert payload['version']=='2.1.0' and payload['mode']=='manual'
    assert len(payload['comparisons'])==2 and len(payload['review_events'])>=3
    assert all(c['sample_mapping']=={'A':c['a'],'B':c['b']} for c in payload['comparisons'])
    assert payload['comparisons'][1]['approved_at_tasting']=={'A':True,'B':True}
    assert 'withdrawn' in payload['review_withdrawal_policy']
    assert any(e['new_status']=='pending' and e['previous_status']=='approved' for e in payload['review_events'])
    assert any(e['review_note']=='Review note A' for e in payload['review_events'])
    print('PASS auditable A/B presentation, timestamps, review decisions and approval-at-tasting history')
    page.locator('#simMode').click()
    assert st()['votes']['simulation']==4
    page.locator('#manualMode').click()
    page.once('dialog',lambda d:d.accept())
    page.locator('#resetVotes').click()
    assert st()['votes']=={'simulation':4,'manual':0}
    assert len(js('PintxoDebug.getReviewEvents()'))>=3
    print('PASS mode-specific reset; review audit events retained')
    for language in ('es','eu','en'):
        page.locator(f'button[data-lang="{language}"]').click()
        assert page.locator('.review-note').is_visible()
        assert page.locator('#blind').is_visible()
    print('PASS EN/ES/EU labels and review-note controls')
    for width in [320,390,768,1440]:
        page.set_viewport_size({'width':width,'height':850})
        sizes=js('({w:document.documentElement.clientWidth,s:document.documentElement.scrollWidth})')
        assert sizes['s']<=sizes['w']+1,(width,sizes)
    assert not errors,errors
    print('PASS responsive layouts and no browser errors')
    page.screenshot(path=str(root.parent/'pintxo-map-2.1-preview.png'),full_page=True)
    browser.close()
print('ALL REGRESSION CHECKS PASSED')
