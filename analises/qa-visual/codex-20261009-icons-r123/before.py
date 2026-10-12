from pathlib import Path
import json
from playwright.sync_api import sync_playwright, TimeoutError
OUT=Path(__file__).resolve().parent
routes=[('home','/'),('search','/search?q=saco'),('search-empty','/search'),('collection','/collections/t-shirts'),('pdp','/products/m3d-pl001'),('cart','/cart'),('quote','/pages/pedir-orcamento?view=m3d-quote')]
report=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True)
 for width in [1440,390]:
  ctx=browser.new_context(viewport={'width':width,'height':960 if width==1440 else 844})
  ctx.route('**/*',lambda route: route.continue_() if route.request.method in ['GET','HEAD','OPTIONS'] else route.abort())
  page=ctx.new_page()
  for label,path in routes:
   res=page.goto('http://127.0.0.1:9292'+path,wait_until='domcontentloaded')
   try: page.wait_for_load_state('networkidle',timeout=4000)
   except TimeoutError: pass
   page.evaluate('document.fonts.ready')
   page.screenshot(path=str(OUT/f'before-{label}-{width}.png'),full_page=True)
   report.append({'label':label,'width':width,'status':res.status,'overflow':page.evaluate('Math.max(0,document.documentElement.scrollWidth-innerWidth)')})
  ctx.close()
 browser.close()
(OUT/'before.json').write_text(json.dumps(report,indent=2),encoding='utf8')
print(json.dumps(report))
