from pathlib import Path
from playwright.sync_api import sync_playwright
import json, os, threading, http.server, socketserver, functools
path=Path(__file__).resolve().parents[1]/'index.html'
handler=functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(path.parent))
server=socketserver.TCPServer(('127.0.0.1',0),handler)
threading.Thread(target=server.serve_forever,daemon=True).start()
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox','--no-proxy-server','--proxy-bypass-list=*'])
    page=browser.new_page(viewport={'width':1365,'height':900},accept_downloads=True)
    errors=[]
    page.on('pageerror',lambda err: errors.append(str(err)))
    page.set_content(path.read_text().replace('<script defer src="app.js"></script>','').replace('<link rel="stylesheet" href="styles.css">',''), wait_until='domcontentloaded')
    page.add_style_tag(content=(path.parent/'styles.css').read_text())
    page.add_script_tag(content=(path.parent/'app.js').read_text())
    page.wait_for_timeout(450)
    print('ERRORS',errors)
    state=page.evaluate('PintxoDebug.getState()')
    print('initial',json.dumps(state))
    assert state['catalog']>1000,state
    assert len(page.locator('.grid .cell').all())==30
    page.get_by_role('button', name='Simulate four votes').click()
    sim=page.evaluate('PintxoDebug.getState()')
    print('after 4 synthetic votes',sim)
    assert sim['votes']['simulation']==4
    assert sim['votes']['manual']==0
    page.get_by_role('button',name='Manual tasting').click()
    assert page.locator('#pair').inner_text().find('Approve')>=0
    page.locator('#approve').click()
    first=page.evaluate('PintxoDebug.getState()')['selected']
    # choose a second distinct cell; click, approve
    for cell in page.locator('#grid .cell:not(.empty)').all():
        if first not in cell.get_attribute('aria-label'):
            cell.click()
            if page.locator('#chefBadge').inner_text()=='Pending':
                page.locator('#approve').click()
                break
    current=page.evaluate('PintxoDebug.getState()')
    print('after manual approvals',current)
    assert current['approved']>=2
    assert page.locator('#pair button').count()==2
    page.locator('#pair button').first.click()
    after=page.evaluate('PintxoDebug.getState()')
    assert after['votes']['manual']==1 and after['votes']['simulation']==4
    page.get_by_role('button',name='EN',exact=True).click()
    page.get_by_role('button',name='ES',exact=True).click()
    assert page.locator('#chefTitle').inner_text()=='Revisión del chef'
    page.get_by_role('button',name='EU',exact=True).click()
    assert 'Sukaldariaren' in page.locator('#chefTitle').inner_text()
    page.get_by_role('button',name='EN',exact=True).click()
    with page.expect_download() as d:
        page.locator('#export').click()
    download=d.value
    print('download',download.suggested_filename)
    assert 'manual' in download.suggested_filename
    page.locator('#benchmark').click()
    page.wait_for_function('PintxoDebug.getState().benchmark === true',timeout=60000)
    print('benchmark',page.locator('#benchmarkInfo').inner_text())
    assert page.locator('#chart polyline').count()==2
    page.screenshot(path='/mnt/data/pintxo-map-2.1-smoke-preview.png',full_page=True)
    assert not errors,errors
    browser.close()
print('PASS')
