(function(){
  'use strict';
  if(customElements.get('m3d-product'))return;
  class M3dProduct extends HTMLElement{
    connectedCallback(){
      if(this.controller)return;
      this.controller=new AbortController();
      const opts={signal:this.controller.signal};
      this.form=this.querySelector('[data-type=m3d-product-form]');
      if(!this.form)return;
      this.variants=JSON.parse(this.querySelector('[data-m3d-variants]').textContent);
      this.strings=JSON.parse(this.querySelector('[data-m3d-strings]').textContent);
      const config=JSON.parse(this.querySelector('[data-m3d-personalization]').textContent);
      this.config=config&&Array.isArray(config.techniques)?config.techniques.filter(t=>t.price_included===true&&Array.isArray(t.positions)&&t.positions.length):[];
      this.variant=this.variants.find(v=>String(v.id)===this.form.querySelector('[data-m3d-variant-id]').value)||this.variants[0];
      this.batch=new Map();
      this.personalization=null;
      this.logoFile=null;
      this.busy=false;
      this.draftTechnique=null;
      this.draftPosition=null;
      this.addEventListener('change',e=>this.change(e),opts);
      this.addEventListener('click',e=>this.click(e),opts);
      this.form.addEventListener('submit',e=>this.submit(e),{...opts,capture:true});
      this.addEventListener('m3d:dialog-closed',e=>this.dialogClosed(e),opts);
      this.updateVariant(this.variant,false);
    }
    disconnectedCallback(){
      if(this.controller)this.controller.abort();
      this.controller=null;
    }
    q(selector){return this.querySelector(selector);}
    dialog(selector){return this.q(selector);}
    setMessage(node,text,error=false){
      if(!node)return;
      node.textContent=text||'';
      node.toggleAttribute('data-error',error);
      if(text&&node.animate&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)node.animate([{opacity:0},{opacity:1}],{duration:120});
    }
    change(event){
      if(event.target.matches('[data-m3d-option]')){
        const selections=Array.from(this.querySelectorAll('[data-m3d-option]:checked')).sort((a,b)=>Number(a.dataset.m3dOption)-Number(b.dataset.m3dOption)).map(el=>el.value);
        const next=this.variants.find(v=>v.options.length===selections.length&&v.options.every((o,i)=>o===selections[i]));
        this.batch.clear();this.updateQuantitySummary();
        this.updateVariant(next,true);
      }
      if(event.target.matches('[data-m3d-logo]')){
        const file=event.target.files[0];
        this.q('[data-m3d-file-name]').textContent=file?file.name:'';
      }
    }
    updateVariant(variant,notify){
      this.variant=variant||null;
      const id=this.q('[data-m3d-variant-id]');
      id.name='id';id.value=variant?variant.id:'';id.disabled=!variant;
      const price=this.q('[data-m3d-price]');
      if(price&&variant)price.innerHTML=variant.price_html;
      const stock=this.q('[data-m3d-stock]');
      if(stock)stock.textContent=variant?(variant.tracked?this.strings.stock_count.replace('[count]',Math.max(0,variant.inventory_quantity)):this.strings.stock_on_request):this.strings.unavailable;
      this.querySelectorAll('[data-m3d-sku],[data-m3d-detail-sku]').forEach(el=>{el.textContent=variant?variant.sku||'':'';});
      this.querySelectorAll('[data-m3d-option]:checked').forEach(el=>{const label=this.q('[data-m3d-option-label="'+el.dataset.m3dOption+'"]');if(label)label.textContent=el.value;});
      const nativeQuantity=this.form.querySelector('[name=quantity]');
      if(nativeQuantity&&variant){nativeQuantity.min=variant.min;nativeQuantity.step=variant.increment;nativeQuantity.value=variant.min;if(variant.max)nativeQuantity.max=variant.max;else nativeQuantity.removeAttribute('max');}
      this.updateAddButton();
      this.filterQuantityRows();
      if(notify&&variant)this.dispatchEvent(new CustomEvent('m3d:variant-change',{detail:{variant},bubbles:true}));
    }
    updateAddButton(){
      const button=this.q('[data-m3d-add]');
      const label=this.q('[data-m3d-add-label]');
      const quote=this.q('[data-m3d-quote]');
      if(!button||!label)return;
      const batch=Array.from(this.batch.keys()).map(id=>this.variants.find(v=>v.id===id));
      const zero=batch.some(v=>!v||v.price===0);
      const needsQuote=!!this.variant&&(this.variant.price===0||zero);
      const valid=this.variant&&this.variant.available&&this.variant.price>0&&!zero;
      button.hidden=needsQuote;
      if(quote)quote.hidden=!needsQuote;
      button.disabled=this.busy||!valid;
      this.updateAccelerated();
      label.textContent=this.busy?this.strings.adding:!this.variant?this.strings.unavailable:this.variant.available?this.strings.add:this.strings.sold_out;
    }
    updateAccelerated(){
      const accelerated=this.q('[data-m3d-dynamic-checkout]');
      const batch=Array.from(this.batch.keys()).map(id=>this.variants.find(v=>v.id===id));
      if(accelerated)accelerated.hidden=this.busy||!this.variant||!this.variant.available||this.variant.price<=0||batch.some(v=>!v||!v.available||v.price<=0)||this.batch.size>1||!!this.personalization;
    }
    filterQuantityRows(){
      const sizeField=Array.from(this.querySelectorAll('[data-m3d-option-name]')).find(el=>/^(tamanho|size|taille)$/i.test(el.dataset.m3dOptionName));
      const sizeIndex=sizeField?Number(sizeField.dataset.m3dOptionIndex):-1;
      this.querySelectorAll('[data-m3d-quantity-row]').forEach(row=>{
        const v=this.variants.find(v=>String(v.id)===row.dataset.m3dQuantityRow);
        row.hidden=!!this.variant&&sizeIndex>=0&&v.options.some((o,i)=>i!==sizeIndex&&o!==this.variant.options[i]);
      });
    }
    click(event){
      const trigger=event.target.closest('.m3d-pdp__quantity-trigger');
      if(trigger){
        this.filterQuantityRows();
        this.querySelectorAll('[data-m3d-quantity]').forEach(el=>{el.value=this.batch.get(Number(el.dataset.m3dQuantity))||0;});
        this.setMessage(this.q('[data-m3d-quantity-error]'),'');
      }
      const step=event.target.closest('[data-m3d-step]');
      if(step){
        const input=step.parentElement.querySelector('[data-m3d-quantity]');
        if(!input||input.disabled)return;
        const increment=Number(input.dataset.increment)||1,min=Number(input.dataset.min)||1,max=input.max?Number(input.max):Infinity;
        let value=Number(input.value)||0;
        if(Number(step.dataset.m3dStep)>0)value=value===0?min:Math.min(max,value+increment);
        else value=value<=min?0:value-increment;
        input.value=Math.max(0,value);
      }
      if(event.target.closest('[data-m3d-confirm-quantities]'))this.confirmQuantities();
      const technique=event.target.closest('[data-m3d-technique]');
      if(technique)this.preparePersonalization(technique.dataset.m3dTechnique);
      const position=event.target.closest('[data-m3d-position]');
      if(position)this.selectPosition(Number(position.dataset.m3dPosition));
      if(event.target.closest('[data-m3d-confirm-personalization]'))this.confirmPersonalization();
      if(event.target.closest('[data-m3d-no-personalization]'))this.clearPersonalization();
      if(event.target.closest('[data-m3d-preview-create]'))this.setMessage(this.q('[data-m3d-myshop-status]'),this.strings.myshop_preview);
    }
    confirmQuantities(){
      const batch=new Map();
      let invalid=false;
      this.querySelectorAll('[data-m3d-quantity-row]:not([hidden]) [data-m3d-quantity]').forEach(input=>{
        const v=this.variants.find(v=>String(v.id)===input.dataset.m3dQuantity),quantity=Number(input.value);
        if(!Number.isInteger(quantity)||quantity<0){invalid=true;return;}
        if(quantity===0)return;
        const maxStock=v.tracked&&v.inventory_policy==='deny'?Math.max(0,v.inventory_quantity):Infinity;
        if(!input.checkValidity()||!v.available||v.price===0||quantity<v.min||(quantity-v.min)%v.increment!==0||(v.max&&quantity>v.max)||quantity>maxStock){invalid=true;return;}
        batch.set(v.id,quantity);
      });
      if(invalid){this.setMessage(this.q('[data-m3d-quantity-error]'),this.strings.invalid_quantity,true);return;}
      if(!batch.size){this.setMessage(this.q('[data-m3d-quantity-error]'),this.strings.choose_quantities,true);return;}
      this.batch=batch;
      const first=this.variants.find(v=>v.id===batch.keys().next().value);
      if(first){
        this.querySelectorAll('[data-m3d-option]').forEach(input=>{input.checked=input.value===first.options[Number(input.dataset.m3dOption)];});
        this.updateVariant(first,true);
      }
      this.updateQuantitySummary();
      const quantity=this.form.querySelector('[name=quantity]');if(quantity)quantity.value=batch.get(first.id);
      this.updateAccelerated();
      window.M3DMotion.close(this.q('dialog[id^=M3dQuantity]'));
    }
    updateQuantitySummary(){
      const summary=this.q('[data-m3d-quantity-summary]');
      if(!summary)return;
      const count=Array.from(this.batch.values()).reduce((a,b)=>a+b,0);
      summary.textContent=count?this.strings.quantity_selected.replace('[count]',count):this.strings.select_quantities;
      this.updateAddButton();
    }
    preparePersonalization(name){
      this.draftTechnique=this.config.find(t=>t.name===name);
      this.draftPosition=null;
      this.setMessage(this.q('[data-m3d-personalization-error]'),'');
      const target=this.q('[data-m3d-positions]');target.replaceChildren();
      this.q('[data-m3d-technique-label]').textContent=name;
      if(!this.draftTechnique)return;
      (this.draftTechnique.positions||[]).forEach((position,index)=>{
        const button=document.createElement('button');button.type='button';button.className='m3d-pdp__position';button.dataset.m3dPosition=index;button.setAttribute('aria-pressed','false');
        if(position.image&&/^https:\/\//.test(position.image)){
          const image=document.createElement('img');image.src=position.image;image.alt=position.name;image.width=240;image.height=144;button.append(image);
        }
        const label=document.createElement('span');label.textContent=position.name;button.append(label);target.append(button);
      });
      const saved=this.personalization&&this.personalization.technique===name?this.personalization:null;
      const index=saved?this.draftTechnique.positions.findIndex(p=>p.name===saved.position):0;
      this.selectPosition(Math.max(0,index));
      if(saved){this.q('[data-m3d-width]').value=saved.width;this.q('[data-m3d-height]').value=saved.height;}
      const file=this.q('[data-m3d-logo]');file.disabled=false;
      file.value='';
      this.q('[data-m3d-file-name]').textContent=this.logoFile?this.logoFile.name:'';
    }
    selectPosition(index){
      const position=this.draftTechnique&&this.draftTechnique.positions[index];
      if(!position)return;
      this.draftPosition=position;
      this.querySelectorAll('[data-m3d-position]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.m3dPosition)===index)));
      const width=this.q('[data-m3d-width]'),height=this.q('[data-m3d-height]');
      width.max=Number(position.max_width_mm)||0;height.max=Number(position.max_height_mm)||0;
      width.value='';height.value='';
      this.q('[data-m3d-area-limit]').textContent=this.strings.area_limit.replace('[width]',width.max).replace('[height]',height.max);
    }
    confirmPersonalization(){
      const width=Number(this.q('[data-m3d-width]').value),height=Number(this.q('[data-m3d-height]').value);
      if(!this.draftTechnique||!this.draftPosition||width<=0||height<=0||!this.q('[data-m3d-width]').checkValidity()||!this.q('[data-m3d-height]').checkValidity()){
        this.setMessage(this.q('[data-m3d-personalization-error]'),this.strings.invalid_dimensions,true);return;
      }
      this.personalization={technique:this.draftTechnique.name,position:this.draftPosition.name,width,height};
      const file=this.q('[data-m3d-logo]').files[0];if(file)this.logoFile=file;
      this.syncPersonalization();
      window.M3DMotion.close(this.q('dialog[id^=M3dPersonalization]'));
    }
    syncPersonalization(){
      this.querySelectorAll('[data-m3d-property]').forEach(input=>{input.disabled=!this.personalization;input.value=this.personalization?this.personalization[input.dataset.m3dProperty]:'';});
      this.q('[data-m3d-no-personalization]').setAttribute('aria-pressed',String(!this.personalization));
      this.querySelectorAll('[data-m3d-technique]').forEach(el=>el.setAttribute('aria-pressed',String(!!this.personalization&&el.dataset.m3dTechnique===this.personalization.technique)));
      const summary=this.q('[data-m3d-configuration-summary]');
      if(summary)summary.textContent=this.personalization?[this.personalization.technique,this.personalization.position,this.personalization.width+' × '+this.personalization.height+' mm'].join(' · '):'';
      this.updateAccelerated();
      this.q('[data-m3d-logo]').disabled=!this.personalization||!this.logoFile;
    }
    clearPersonalization(){
      this.personalization=null;this.logoFile=null;this.q('[data-m3d-logo]').value='';
      this.syncPersonalization();
    }
    dialogClosed(event){
      if(event.target===this.q('dialog[id^=M3dPersonalization]'))this.syncPersonalization();
    }
    async refreshCart(){
      try{
        const response=await fetch(this.dataset.cartUrl,{headers:{Accept:'application/json'}});
        if(!response.ok)return;
        const cart=await response.json();
        document.querySelectorAll('[data-cart-count]').forEach(el=>{el.textContent=cart.item_count;});
        document.dispatchEvent(new CustomEvent('m3d:cart-updated',{detail:{cart}}));
      }catch(_){}
    }
    async submit(event){
      event.preventDefault();event.stopPropagation();
      if(this.busy)return;
      if(!this.variant||!this.variant.available||this.variant.price<=0)return;
      let items=this.batch.size?Array.from(this.batch.entries()).map(([id,quantity])=>({id,quantity})):[{id:this.variant.id,quantity:Number(this.form.querySelector('[name=quantity]').value)}];
      const invalid=items.some(item=>{
        const v=this.variants.find(v=>v.id===item.id);
        return !v||!v.available||v.price<=0||!Number.isInteger(item.quantity)||item.quantity<v.min||(item.quantity-v.min)%v.increment!==0||(v.max&&item.quantity>v.max);
      });
      if(invalid){this.setMessage(this.q('[data-m3d-add-status]'),this.strings.invalid_quantity,true);return;}
      if(this.logoFile&&items.length>1){this.setMessage(this.q('[data-m3d-add-status]'),this.strings.upload_multiple,true);return;}
      const properties={};
      this.querySelectorAll('[data-m3d-property]:not(:disabled)').forEach(el=>{const match=el.name.match(/^properties\[(.*)\]$/);if(match&&el.value)properties[match[1]]=el.value;});
      const button=this.q('[data-m3d-add]');this.busy=true;button.setAttribute('aria-busy','true');this.updateAddButton();
      this.setMessage(this.q('[data-m3d-add-status]'),'');
      try{
        let body,headers={Accept:'application/json'};
        if(this.logoFile||items.length===1){
          body=new FormData(this.form);body.set('id',items[0].id);body.set('quantity',items[0].quantity);body.delete('properties[Logótipo]');
          if(this.logoFile)body.set('properties[Logótipo]',this.logoFile,this.logoFile.name);
        }else{
          items=items.map(item=>({...item,properties}));
          body=JSON.stringify({items});headers['Content-Type']='application/json';
        }
        const response=await fetch(this.dataset.addUrl,{method:'POST',headers,body});
        const result=await response.json();
        await this.refreshCart();
        if(!response.ok){this.setMessage(this.q('[data-m3d-add-status]'),result.description||result.message||this.strings.add_error,true);return;}
        this.setMessage(this.q('[data-m3d-add-status]'),this.strings.added);
      }catch(_){
        await this.refreshCart();
        this.setMessage(this.q('[data-m3d-add-status]'),this.strings.add_error,true);
      }finally{this.busy=false;button.removeAttribute('aria-busy');this.updateAddButton();}
    }
  }
  customElements.define('m3d-product',M3dProduct);
})();