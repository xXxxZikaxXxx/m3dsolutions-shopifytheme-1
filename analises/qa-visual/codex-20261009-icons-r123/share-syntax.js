
  if (!customElements.get('share-button')) {
    customElements.define('share-button', class extends HTMLElement {
      connectedCallback() {
        if (this.controller) return;
        this.controller = new AbortController();
        this.button = this.querySelector('button');
        this.message = this.querySelector('.share-button__message');
        this.button.addEventListener('click', () => this.share(), { signal: this.controller.signal });
      }
      disconnectedCallback() {
        this.controller?.abort();
        this.controller = null;
        clearTimeout(this.messageTimer);
      }
      async share() {
        if (this.busy) return;
        this.busy = true;
        try {
          if (navigator.share) {
            try {
              await navigator.share({ url: this.dataset.shareUrl, title: this.dataset.shareTitle || document.title });
              return;
            } catch (error) {
              if (error.name === 'AbortError') return;
            }
          }
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(this.dataset.shareUrl);
          } else {
            const input = document.createElement('textarea');
            input.value = this.dataset.shareUrl;
            input.setAttribute('readonly', '');
            input.className = 'visually-hidden';
            this.append(input);
            input.select();
            const copied = document.execCommand('copy');
            input.remove();
            this.button.focus();
            if (!copied) throw new Error('COPY_FAILED');
          }
          this.showMessage(this.dataset.copiedMessage);
        } catch (error) {
          this.showMessage(this.dataset.errorMessage);
        } finally {
          this.busy = false;
        }
      }
      showMessage(text) {
        clearTimeout(this.messageTimer);
        this.message.hidden = false;
        this.message.textContent = text;
        this.messageTimer = setTimeout(() => { this.message.hidden = true; }, 4000);
      }
    });
  }
