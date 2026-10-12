from playwright.sync_api import sync_playwright
from pathlib import Path
import json
OUT=Path(__file__).resolve().parent
R={}
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True);ctx=b.new_context(viewport={'width':390,'height':844});ctx.route('**/*',lambda r:r.continue_() if r.request.method in ['GET','HEAD','OPTIONS'] else r.abort());p=ctx.new_page();p.goto('http://127.0.0.1:9292/products/m3d-pl001',wait_until='domcontentloaded');p.wait_for_timeout(500)
 trigger=p.locator('.m3d-product-gallery__actions [data-m3d-dialog-open]');trigger.focus();p.keyboard.press('Enter');assert p.locator('dialog[open]').count()==1;p.keyboard.press('Escape');p.wait_for_function("document.querySelector('.m3d-product-gallery__actions [data-m3d-dialog-open]')===document.activeElement");R['myshopFocusAfterAnimation']=True
 p.locator('[data-m3d-option="1"][value="3XL"]').click(force=True);assert p.locator('[data-m3d-add]').is_disabled();share=p.locator('share-button').get_attribute('data-share-url');assert 'variant=' not in share;quote=p.locator('.m3d-product-gallery__quote');quote.click();assert '/products/m3d-pl001' in p.url;assert p.locator('[data-m3d-add-status]').inner_text()=='Indisponível';R['missingCombination']={'share':share,'blocked':True,'announced':True}
 p.goto('http://127.0.0.1:9292/products/m3d-pl001',wait_until='domcontentloaded');p.wait_for_selector('.related-products [data-open-myshop]');rec=p.locator('.related-products [data-open-myshop]').first;rec.click();assert p.locator('.related-products dialog[open]').count()==1;p.keyboard.press('Escape');p.wait_for_function("document.querySelector('.related-products [data-open-myshop]')===document.activeElement");R['recommendationsMyShop']=True
 ctx.close();b.close()
(OUT/'directed.json').write_text(json.dumps(R,indent=2),encoding='utf8');print(json.dumps(R))
