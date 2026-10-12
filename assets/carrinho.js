/* Shared AJAX add/count helper and presentation-only consultation checkout guard.
   PDP m3d-product owns its own form. A zero final total caused by discount is legitimate.
   An uncertain AJAX failure must not silently repeat an add through native form.submit(). */
(() => {
  'use strict';
  const policy = document.querySelector('[data-m3d-cart-policy]');
  const pendingForms = new WeakSet();
  let quoteRequired = policy?.dataset.quoteRequired === 'true';

  function cartRoute(resource) {
    const root = window.Shopify?.routes?.root || '/';
    return new URL(root + resource, window.location.origin).toString();
  }

  function updateCartCount(count) {
    if (!Number.isInteger(count) || count < 0) return;
    for (const element of document.querySelectorAll('[data-cart-count]')) element.textContent = count;
  }

  /** @param {string} message @param {boolean} error */
  function announce(message, error = false) {
    if (!message) return;
    const status = policy?.querySelector('[data-m3d-cart-status]');
    if (status) status.textContent = message;
    if (typeof window.mostrarAlerta === 'function') window.mostrarAlerta(message, error ? 'negativo' : 'positivo');
  }

  /** Ajax cart has original_price before discounts; it does not expose variant.price.
   * Its zero original price is a conservative UI consultation candidate, never backend enforcement.
   * @param {{items: Array}} cart @returns {boolean|null}
   */
  function requiresQuote(cart) {
    if (!Array.isArray(cart?.items)) return null;
    if (cart.items.some((item) => !Number.isFinite(item.original_price))) return null;
    return cart.items.some((item) => {
      if (!Number.isFinite(item.original_price) || item.original_price !== 0) return false;
      if (Number.isFinite(item.variant?.price)) return item.variant.price === 0;
      return true;
    });
  }

  function updateCheckoutGuard(blocked) {
    quoteRequired = blocked;
    if (policy) policy.dataset.quoteRequired = String(blocked);
    for (const root of document.querySelectorAll('[data-m3d-cart-quote-required]')) {
      root.dataset.m3dCartQuoteRequired = String(blocked);
      for (const notice of root.querySelectorAll('[data-m3d-cart-quote-notice], [data-m3d-cart-partial-note]')) notice.hidden = !blocked;
      for (const additional of root.querySelectorAll('[data-m3d-additional-checkout]')) additional.hidden = blocked;
      for (const button of root.querySelectorAll('[data-m3d-checkout]')) {
        if (blocked) {
          button.disabled = true;
          button.dataset.m3dQuoteDisabled = 'true';
        } else if (button.dataset.m3dQuoteDisabled === 'true') {
          button.disabled = false;
          delete button.dataset.m3dQuoteDisabled;
          button.removeAttribute('aria-describedby');
        }
      }
    }
  }

  async function refreshCartCount() {
    try {
      const response = await fetch(cartRoute('cart.js'), { headers: { Accept: 'application/json' }, cache: 'no-store' });
      if (!response.ok) return;
      const cart = await response.json();
      updateCartCount(cart.item_count);
      const blocked = requiresQuote(cart);
      if (blocked !== null) updateCheckoutGuard(blocked);
    } catch {
      // Preserve the Liquid guard on a failed read; do not invent a successful cart state.
    }
  }

  function blockCheckout(event) {
    if (!quoteRequired) return false;
    event.preventDefault();
    event.stopPropagation();
    const notice = document.querySelector('[data-m3d-cart-quote-notice]');
    if (notice) { notice.hidden = false; notice.focus(); }
    announce(policy?.dataset.quoteMessage, true);
    return true;
  }

  function guardCheckoutClick(event) {
    const target = event.target instanceof Element
      ? event.target.closest('[data-m3d-checkout], button[name="checkout"], a[href]')
      : null;
    if (!target || !quoteRequired) return;
    if (target.matches('[data-m3d-checkout], button[name="checkout"]')) { blockCheckout(event); return; }
    try {
      const url = new URL(target.href, window.location.origin);
      if (url.origin === window.location.origin && /(?:^|\/)checkout(?:\/|$)/u.test(url.pathname)) blockCheckout(event);
    } catch {
      // Non-navigation anchors do not participate in checkout.
    }
  }

  function guardCheckoutSubmit(event) {
    if (event.submitter?.name === 'checkout') blockCheckout(event);
  }

  async function handleAdd(event) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || event.defaultPrevented) return;
    if (form.closest('m3d-product')) return;
    if (!form.matches('form[action$="/cart/add"], form[data-type="add-to-cart-form"]')) return;
    event.preventDefault();
    if (pendingForms.has(form)) return;
    pendingForms.add(form);
    const button = form.querySelector('[type="submit"], [name="add"]');
    button?.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch(cartRoute('cart/add.js'), {
        method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form)
      });
      if (!response.ok) throw new Error('Cart add was not accepted');
      await refreshCartCount();
      announce(policy?.dataset.addedMessage || window.themeStrings?.addedToCart);
    } catch {
      await refreshCartCount();
      announce(policy?.dataset.addError, true);
    } finally {
      pendingForms.delete(form);
      button?.removeAttribute('aria-busy');
    }
  }

  document.addEventListener('click', guardCheckoutClick, true);
  document.addEventListener('submit', guardCheckoutSubmit, true);
  document.addEventListener('submit', handleAdd);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', refreshCartCount, { once: true });
  else refreshCartCount();
})();
