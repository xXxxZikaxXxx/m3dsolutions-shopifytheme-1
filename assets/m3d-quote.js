(() => {
  'use strict';
  if (customElements.get('m3d-quote')) return;

  /** Progressive enhancement; submission stays with Shopify's native contact form. */
  class M3dQuote extends HTMLElement {
    #listeners = null;

    connectedCallback() {
      this.#listeners?.abort();
      this.#listeners = new AbortController();
      const result = this.querySelector('[data-quote-result]');
      if (result) queueMicrotask(() => { if (this.isConnected) result.focus(); });
      const form = this.querySelector('form');
      if (!form || !this.querySelector('[data-quote-field="product"]')) return;

      this.#applyContext();
      form.addEventListener('invalid', (event) => this.#showFieldError(event.target), {
        capture: true,
        signal: this.#listeners.signal
      });
      form.addEventListener('input', (event) => this.#clearFieldError(event.target), {
        signal: this.#listeners.signal
      });
      const product = this.querySelector('[data-quote-field="product"]');
      product.addEventListener('input', () => this.#clearProductReference(), {
        signal: this.#listeners.signal
      });
      const variant = this.querySelector('[data-quote-field="variant"]');
      variant?.addEventListener('input', () => {
        this.querySelector('[data-quote-variant-id]').value = '';
      }, { signal: this.#listeners.signal });
      // No fetch, submit interception, success simulation or local personal-data storage.
    }

    disconnectedCallback() {
      this.#listeners?.abort();
    }

    /** @param {string|null} value @param {number} limit @param {boolean} multiline */
    #cleanText(value, limit, multiline = false) {
      const cleaned = String(value || '')
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/gu, '')
        .replace(/\r\n?/gu, '\n');
      return (multiline ? cleaned : cleaned.replace(/\s+/gu, ' ')).trim().slice(0, limit);
    }

    /** A navigational product link is not proof of a product or variant's identity.
     * @param {string|null} value @returns {string}
     */
    #productUrl(value) {
      if (!value || value.length > 2048) return '';
      try {
        const url = new URL(value, window.location.origin);
        if (url.origin !== window.location.origin || url.username || url.password) return '';
        if (!/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?products\/[a-z0-9][a-z0-9-]{0,199}\/?$/iu.test(url.pathname)) return '';
        return url.origin + url.pathname;
      } catch {
        return '';
      }
    }

    #applyContext() {
      if (window.location.search.length > 32768) return;
      const params = new URLSearchParams(window.location.search);
      const mappings = [
        { name: 'product', aliases: ['product', 'produto'], limit: 160 },
        { name: 'variant', aliases: ['variant', 'variante'], limit: 160 },
        { name: 'personalization', aliases: ['personalization', 'personalizacao'], limit: 500, multiline: true },
        { name: 'lines', aliases: ['lines'], limit: 2000, multiline: true }
      ];
      let hasContext = false;
      let wasLimited = false;
      for (const mapping of mappings) {
        let raw = null;
        for (const alias of mapping.aliases) {
          if (params.has(alias)) { raw = params.get(alias); break; }
        }
        const value = this.#cleanText(raw, mapping.limit, mapping.multiline);
        const input = this.querySelector('[data-quote-field="' + mapping.name + '"]');
        if (!input || !value) continue;
        if (!input.value) input.value = value;
        hasContext = true;
        if (String(raw || '').length > mapping.limit) wasLimited = true;
      }
      const rawQuantity = this.#cleanText(params.get('quantity') || params.get('quantidade'), 20);
      const quantity = this.querySelector('[data-quote-field="quantity"]');
      if (quantity && !quantity.value && /^[1-9]\d{0,5}$/u.test(rawQuantity)) {
        quantity.value = rawQuantity;
        hasContext = true;
      }
      const requestedProduct = this.#cleanText(params.get('product') || params.get('produto'), 160);
      const requestedVariant = this.#cleanText(params.get('variant') || params.get('variante'), 160);
      const productInput = this.querySelector('[data-quote-field="product"]');
      const variantInput = this.querySelector('[data-quote-field="variant"]');
      const productUnchanged = !requestedProduct || productInput?.value === requestedProduct;
      const variantUnchanged = !requestedVariant || variantInput?.value === requestedVariant;
      const productUrl = productUnchanged ? this.#productUrl(params.get('product_url')) : '';
      const productLink = this.querySelector('[data-quote-product-link]');
      const productReference = this.querySelector('[data-quote-product-url]');
      if (productUrl && productLink && productReference) {
        productLink.href = productUrl;
        productLink.hidden = false;
        productReference.value = productUrl;
        hasContext = true;
      }
      const variantId = this.#cleanText(params.get('variant_id'), 30);
      const variantReference = this.querySelector('[data-quote-variant-id]');
      if (variantReference && productUnchanged && variantUnchanged && /^[1-9]\d{0,19}$/u.test(variantId)) {
        variantReference.value = variantId;
      }
      const contextHint = this.querySelector('[data-quote-context]');
      if (contextHint) {
        contextHint.hidden = !hasContext;
        if (wasLimited && this.dataset.contextLimited) contextHint.textContent = this.dataset.contextLimited;
      }
    }

    #clearProductReference() {
      const link = this.querySelector('[data-quote-product-link]');
      if (link) { link.hidden = true; link.removeAttribute('href'); }
      for (const selector of ['[data-quote-product-url]', '[data-quote-variant-id]']) {
        const input = this.querySelector(selector);
        if (input) input.value = '';
      }
    }

    /** @param {EventTarget} field @returns {HTMLElement|null} */
    #fieldError(field) {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return null;
      const name = field.name.match(/^contact\[(name|email|body|quantity)\]$/u)?.[1];
      return name ? this.querySelector('[data-quote-error="' + name + '"]') : null;
    }

    /** @param {EventTarget} field */
    #showFieldError(field) {
      const error = this.#fieldError(field);
      if (!error) return;
      field.setAttribute('aria-invalid', 'true');
      error.hidden = false;
      error.textContent = field.name === 'contact[quantity]'
        ? this.dataset.quantityError
        : this.dataset.clientError;
    }

    /** @param {EventTarget} field */
    #clearFieldError(field) {
      const error = this.#fieldError(field);
      if (!error || !field.validity.valid) return;
      field.removeAttribute('aria-invalid');
      error.hidden = true;
    }
  }
  customElements.define('m3d-quote', M3dQuote);
})();
