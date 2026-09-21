(function(){
  'use strict';
  document.querySelectorAll('[data-m3d-email-login]').forEach(function(form){
    if(form.dataset.m3dLoginReady==='true')return;
    form.dataset.m3dLoginReady='true';
    const email=form.querySelector('[data-m3d-login-email]');
    const page=form.closest('.m3d-login');
    const focusTrigger=page?page.querySelector('[data-m3d-login-focus]'):null;
    if(focusTrigger&&email){
      focusTrigger.addEventListener('click',function(){
        email.focus({preventScroll:false});
        email.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
      });
    }
    form.addEventListener('submit',function(event){
      if(!email||!form.checkValidity())return;
      event.preventDefault();
      const target=new URL(form.dataset.loginUrl,window.location.origin);
      target.searchParams.set('login_hint',email.value.trim());
      window.location.assign(target.toString());
    });
  });
})();