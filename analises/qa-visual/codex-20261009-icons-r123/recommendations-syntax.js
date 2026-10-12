
    if (!customElements.get('product-recommendations')) {
      customElements.define('product-recommendations', class extends HTMLElement {
        connectedCallback() {
          if (this.controller) return;
          this.controller = new AbortController();
          const opts = { signal: this.controller.signal };
          this.addEventListener('click', event => {
            const trigger = event.target.closest('[data-open-myshop]');
            if (trigger) {
              const dialog = this.querySelector('#' + CSS.escape(trigger.dataset.openMyshop));
              if (dialog) { dialog.returnFocus = trigger; dialog.showModal(); }
            }
            const close = event.target.closest('[data-close-dialog]');
            if (close) close.closest('dialog')?.close();
            if (event.target.matches('dialog')) event.target.close();
          }, opts);
          this.addEventListener('close', event => { event.target.returnFocus?.focus(); }, { ...opts, capture: true });
          if (!this.querySelector('.product-grid')) this.load();
        }
        disconnectedCallback() { this.controller?.abort(); this.controller = null; }
        async load() {
          try {
            const response = await fetch(this.dataset.url, { signal: this.controller.signal });
            if (!response.ok) return;
            const html = new DOMParser().parseFromString(await response.text(), 'text/html');
            const recommendations = html.querySelector('product-recommendations');
            if (recommendations?.querySelector('.product-grid')) this.innerHTML = recommendations.innerHTML;
          } catch (error) { if (error.name !== 'AbortError') console.error('Recommendations unavailable'); }
        }
      });
    }
  