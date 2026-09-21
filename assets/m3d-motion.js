(function(){
  'use strict';
  if(window.M3DMotion) return;
  const ease='cubic-bezier(.22,.61,.36,1)';
  const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const states=new WeakMap();
  const accordionStates=new WeakMap();
  let savedOverflow=null;
  let savedPadding=null;
  const focusable='a[href],button:not(:disabled),input:not(:disabled):not([type=hidden]),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])';
  function lock(){
    if(savedOverflow!==null)return;
    savedOverflow=document.body.style.overflow;
    savedPadding=document.body.style.paddingRight;
    const gap=window.innerWidth-document.documentElement.clientWidth;
    if(gap>0)document.body.style.paddingRight=(parseFloat(getComputedStyle(document.body).paddingRight)+gap)+'px';
    document.body.style.overflow='hidden';
  }
  function unlock(){
    if(document.querySelector('dialog[data-m3d-dialog][open]'))return;
    if(savedOverflow===null)return;
    document.body.style.overflow=savedOverflow;
    document.body.style.paddingRight=savedPadding;
    savedOverflow=null;savedPadding=null;
  }
  function finishClose(dialog,state,restore){
    if(states.get(dialog)!==state)return;
    if(state.animation)state.animation.cancel();
    dialog.close();
    dialog.removeAttribute('data-motion-state');
    states.delete(dialog);unlock();
    if(restore&&state.opener&&state.opener.isConnected)state.opener.focus({preventScroll:true});
    dialog.dispatchEvent(new CustomEvent('m3d:dialog-closed',{bubbles:true}));
  }
  function close(dialog,restore=true){
    const old=states.get(dialog);
    if(!dialog.open)return;
    if(old&&old.closing)return;
    const current={opacity:getComputedStyle(dialog).opacity,transform:getComputedStyle(dialog).transform};
    if(old&&old.animation)old.animation.cancel();
    const state={opener:old?old.opener:document.activeElement,closing:true,animation:null};
    states.set(dialog,state);dialog.dataset.motionState='closing';
    if(reduced()||!dialog.animate){finishClose(dialog,state,restore);return;}
    state.animation=dialog.animate([current,{opacity:0,transform:'translateY(8px)'}],{duration:160,easing:ease,fill:'forwards'});
    state.animation.finished.then(()=>finishClose(dialog,state,restore)).catch(()=>{});
  }
  function open(dialog,opener){
    if(!(dialog instanceof HTMLDialogElement))return;
    const old=states.get(dialog);
    if(dialog.open&&old&&!old.closing)return;
    let current={opacity:0,transform:'translateY(8px)'};
    if(dialog.open)current={opacity:getComputedStyle(dialog).opacity,transform:getComputedStyle(dialog).transform};
    if(old&&old.animation)old.animation.cancel();
    document.querySelectorAll('dialog[data-m3d-dialog][open]').forEach(other=>{
      if(other===dialog)return;
      const s=states.get(other);if(s&&s.animation)s.animation.cancel();
      other.close();states.delete(other);other.removeAttribute('data-motion-state');
    });
    lock();
    const state={opener:opener||document.activeElement,closing:false,animation:null};
    states.set(dialog,state);dialog.dataset.motionState='opening';
    if(!dialog.open)dialog.showModal();
    const focus=dialog.querySelector('[data-m3d-dialog-focus]')||dialog.querySelector(focusable);
    if(focus)focus.focus({preventScroll:true});
    if(reduced()||!dialog.animate){dialog.dataset.motionState='open';return;}
    state.animation=dialog.animate([current,{opacity:1,transform:'translateY(0)'}],{duration:240,easing:ease});
    state.animation.finished.then(()=>{if(states.get(dialog)===state)dialog.dataset.motionState='open';}).catch(()=>{});
  }
  document.addEventListener('click',event=>{
    const trigger=event.target.closest('[data-m3d-dialog-open]');
    if(trigger){
      const dialog=document.getElementById(trigger.dataset.m3dDialogOpen);
      if(dialog instanceof HTMLDialogElement){event.preventDefault();open(dialog,trigger);}
      return;
    }
    const closer=event.target.closest('[data-m3d-dialog-close]');
    if(closer){const dialog=closer.closest('dialog[data-m3d-dialog]');if(dialog){event.preventDefault();close(dialog);}}
    const summary=event.target.closest('[data-m3d-accordion]>summary');
    if(!summary)return;
    const detail=summary.parentElement;
    const body=detail.querySelector('[data-m3d-accordion-body]');
    if(!body)return;
    event.preventDefault();
    const previous=accordionStates.get(detail);
    const expanded=previous? !previous.expanded:!detail.open;
    const start=detail.open?body.getBoundingClientRect().height:0;
    if(previous&&previous.animation)previous.animation.cancel();
    if(!detail.open)detail.open=true;
    body.style.height='auto';
    const end=expanded?body.scrollHeight:0;
    detail.toggleAttribute('data-expanded',expanded);
    const state={expanded,animation:null};accordionStates.set(detail,state);
    const done=()=>{if(accordionStates.get(detail)!==state)return;detail.open=expanded;body.style.height='';accordionStates.delete(detail);};
    if(reduced()||!body.animate){done();return;}
    state.animation=body.animate([{height:start+'px'},{height:end+'px'}],{duration:220,easing:ease,fill:'forwards'});
    state.animation.finished.then(()=>{if(accordionStates.get(detail)===state){state.animation.cancel();done();}}).catch(()=>{});
  });
  document.addEventListener('cancel',event=>{
    if(event.target.matches('dialog[data-m3d-dialog]')){event.preventDefault();close(event.target);}
  },true);
  document.addEventListener('close',event=>{
    if(!event.target.matches('dialog[data-m3d-dialog]'))return;
    // Native close events are queued; ignore an older event if the dialog has already reopened.
    if(event.target.open)return;
    const state=states.get(event.target);
    if(state&&state.animation)state.animation.cancel();
    states.delete(event.target);event.target.removeAttribute('data-motion-state');unlock();
  },true);
  document.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const dialog=document.querySelector('dialog[data-m3d-dialog][open]');
    if(!dialog)return;
    const items=Array.from(dialog.querySelectorAll(focusable)).filter(el=>el.getClientRects().length&& !el.closest('[hidden]'));
    if(!items.length){event.preventDefault();return;}
    const first=items[0],last=items[items.length-1];
    if(event.shiftKey&&(document.activeElement===first||!items.includes(document.activeElement))){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  window.M3DMotion={open,close,reduced};
})();