"""Browser test for the V2 trilingual Chef Guide (Playwright + Chromium)."""
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]
html = (root / 'index.html').read_text().replace('<script defer src="app.js"></script>', '').replace('<link rel="stylesheet" href="styles.css">', '')
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox','--no-proxy-server','--proxy-bypass-list=*'])
    page = browser.new_page(viewport={'width': 1280, 'height': 880}, locale='en-US')
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.set_content(html, wait_until='domcontentloaded')
    page.add_style_tag(content=(root / 'styles.css').read_text())
    page.add_script_tag(content=(root / 'app.js').read_text())
    assert page.locator('#guideBtn').inner_text().startswith('Guide for chefs')
    initial_state = page.evaluate('PintxoDebug.getState()')

    page.locator('#guideBtn').click()
    assert page.locator('#guidePanel').is_visible()
    assert page.locator('#guidePanel').get_attribute('aria-modal') == 'true'
    assert page.locator('#guideTitle').inner_text() == 'Welcome to Pintxo Map 2.1'
    page.locator('#guideNext').click()
    assert 'Explore the map' in page.locator('#guideTitle').inner_text()
    assert page.locator('#guideSpot').is_visible()
    assert page.locator('#guideTips li').count() == 2
    page.screenshot(path=str(root.parent/'guide-desktop-preview.png'))
    # Switching guide language should translate the guide and app, without changing votes or approvals.
    page.locator('#guideLanguage').select_option('es')
    assert 'Explora el mapa' in page.locator('#guideTitle').inner_text()
    assert page.locator('#guideBtn').inner_text().startswith('Guía para chefs')
    page.locator('#guideLanguage').select_option('eu')
    assert 'Arakatu mapa' in page.locator('#guideTitle').inner_text()
    assert page.locator('#guideBtn').inner_text().startswith('Sukaldarientzako gida')
    assert page.evaluate('PintxoDebug.getState()')['votes'] == initial_state['votes']
    page.locator('#guideLanguage').select_option('en')

    # Traverse all 10 cards; check feedback step contains the chef's five questions.
    for n in range(2, 10):
        page.locator('#guideNext').click()
        assert page.locator('#guideStep').inner_text() == f'Step {n+1} of 10'
    assert page.locator('#guideTips li').count() == 5
    assert 'actually prepare' in page.locator('#guideTips').inner_text()
    page.locator('#guideNext').click()  # closes the final card
    assert page.locator('#chefTour').is_hidden()
    assert page.evaluate('PintxoDebug.getState()')['votes'] == initial_state['votes']
    assert page.evaluate('PintxoDebug.getState()')['approved'] == initial_state['approved']
    print('PASS ten English guide steps, five feedback questions, no modifications to data')

    # Keyboard handling, proper focus retention, safe repeat open/close.
    page.locator('#guideBtn').click()
    page.keyboard.press('ArrowRight')
    assert 'Explore the map' in page.locator('#guideTitle').inner_text()
    page.keyboard.press('ArrowLeft')
    assert 'Welcome' in page.locator('#guideTitle').inner_text()
    page.keyboard.press('Tab')
    assert page.evaluate('document.activeElement.closest("#guidePanel") !== null')
    page.keyboard.press('Escape')
    assert page.locator('#chefTour').is_hidden()
    assert page.evaluate('document.activeElement.id') == 'guideBtn'
    print('PASS keyboard navigation, focus trap and Escape')

    for width in (320, 390, 768, 1440):
        page.set_viewport_size({'width':width,'height':790})
        page.locator('#guideBtn').click()
        for i in (0, 1, 2, 3, 4, 5, 6, 7, 8, 9):
            if i: page.locator('#guideNext').click()
            geometry = page.evaluate('''() => {
                const r=document.querySelector('#guidePanel').getBoundingClientRect();
                return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth};
            }''')
            assert geometry['left'] >= -1 and geometry['right'] <= width+1, (width,i,geometry)
            assert geometry['top'] >= -1 and geometry['bottom'] <= 791, (width,i,geometry)
            assert geometry['scrollWidth'] <= geometry['clientWidth']+1, (width,i,geometry)
        if width == 390:
            page.locator('#guideLanguage').select_option('eu')
            page.screenshot(path=str(root.parent/'guide-mobile-preview.png'))
        page.locator('#guideClose').click()
        if width==390: page.locator('button[data-lang="en"]').click()
    assert not errors, errors
    print('PASS English / Spanish / Basque, viewport sizes 320–1440, no browser errors')
    browser.close()
print('ALL GUIDE CHECKS PASSED')
