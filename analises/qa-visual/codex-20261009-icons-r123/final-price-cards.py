from playwright.sync_api import sync_playwright,TimeoutError
from pathlib import Path
import json
OUT=Path(__file__).resolve().parent
expected={'m3d-sc001':'€1,35','m3d-sc002':'€0,97','m3d-gr001':'€3,56','m3d-cp001':'€13,35','m3d-ts001':'€2,76','m3d-pl001':'€4,27'}
R=[]
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True)
 for width in [1440,390]:
  ctx=b.new_context(viewport={'width':width,'height':960 if width==1440 else 844});ctx.route('**/*',lambda r:r.continue_() if r.request.method in ['GET','HEAD','OPTIONS'] else r.abort());p=ctx.new_page()
  for label,path in [('bags','/collections/bags'),('drinkware','/collections/drinkware'),('t-shirts','/collections/t-shirts'),('search','/search?q=saco')]:
   p.goto('http://127.0.0.1:9292'+path,wait_until='domcontentloaded')
   try:p.wait_for_load_state('networkidle',timeout=1500)
   except TimeoutError:pass
   state=p.evaluate('''()=>({overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),cards:[...document.querySelectorAll('.collection-card')].map(c=>({handle:c.querySelector('.collection-card__product-link').getAttribute('href').split('/').pop(),price:c.querySelector('.price').innerText,arrow:c.querySelector('.collection-card__personalize .m3d-icon').getBoundingClientRect().width}))})''')
   assert state['overflow']==0
   for c in state['cards']:
    if c['handle'] in expected:assert expected[c['handle']] in c['price'],c
    assert c['arrow']==18,c
   p.screenshot(path=str(OUT/f'final-{label}-{width}.png'),full_page=True);R.append({'width':width,'label':label,**state})
  ctx.close()
 b.close()
(OUT/'final-price-cards.json').write_text(json.dumps(R,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps({'cases':len(R),'passed':True}))
