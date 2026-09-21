(() => {
  if (customElements.get('m3d-product-gallery')) return;

  class M3dProductGallery extends HTMLElement {
    connectedCallback() {
      if (this.galleryController) return;
      this.galleryController = new AbortController();
      this.galleryAnimations = new Set();
      this.gallerySlides = Array.from(this.querySelectorAll('[data-gallery-slide]'));
      this.galleryThumbnails = Array.from(this.querySelectorAll('[data-gallery-thumbnail]'));
      this.galleryIndex = Math.max(0, Math.min(Number(this.dataset.galleryActive) || 0, this.gallerySlides.length - 1));
      this.galleryRenderedIndex = this.galleryIndex;
      this.galleryGeneration = (this.galleryGeneration || 0) + 1;
      this.galleryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.galleryHost = this.closest('[data-m3d-product]') || this;
      const options = { signal: this.galleryController.signal };

      this.addEventListener('click', (event) => {
        const thumbnail = event.target.closest('[data-gallery-thumbnail]');
        const direction = event.target.closest('[data-gallery-direction]');
        if (thumbnail && this.contains(thumbnail)) {
          this.select(Number(thumbnail.dataset.galleryThumbnail));
        } else if (direction && this.contains(direction)) {
          this.select(this.galleryIndex + Number(direction.dataset.galleryDirection), Number(direction.dataset.galleryDirection));
        }
      }, options);

      this.addEventListener('keydown', (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.target.closest('video, iframe, model-viewer, input, select, textarea')) return;
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) || this.gallerySlides.length < 2) return;
        event.preventDefault();
        if (event.key === 'Home') this.select(0);
        else if (event.key === 'End') this.select(this.gallerySlides.length - 1);
        else {
          const direction = event.key === 'ArrowLeft' ? -1 : 1;
          this.select(this.galleryIndex + direction, direction);
        }
      }, options);

      this.galleryHost.addEventListener('m3d:variant-change', (event) => {
        const variant = event.detail?.variant;
        const mediaId = variant?.featured_media?.id ?? variant?.featured_media_id;
        if (mediaId == null) return;
        const index = this.gallerySlides.findIndex((slide) => slide.dataset.mediaId === String(mediaId));
        if (index >= 0) this.select(index, 0, true);
      }, options);

      this.galleryReducedMotion.addEventListener('change', () => {
        if (this.galleryReducedMotion.matches) {
          this.galleryGeneration += 1;
          if (this.galleryRenderedIndex !== this.galleryIndex) this.pauseMedia(this.gallerySlides[this.galleryRenderedIndex]);
          this.settle();
        }
      }, options);

      if (this.gallerySlides.length > 1) this.querySelector('[data-gallery-navigation]')?.removeAttribute('hidden');
      this.settle();
      this.updateSelection(false);
    }

    disconnectedCallback() {
      this.galleryGeneration += 1;
      this.galleryController?.abort();
      this.cancelAnimations();
      this.gallerySlides?.filter((slide) => !slide.hidden).forEach((slide) => this.pauseMedia(slide));
      this.galleryController = null;
    }

    cancelAnimations() {
      this.galleryAnimations?.forEach((animation) => animation.cancel());
      this.galleryAnimations?.clear();
    }

    pauseMedia(slide) {
      slide?.querySelectorAll('video').forEach((video) => video.pause());
      slide?.querySelectorAll('iframe').forEach((frame) => {
        const source = frame.getAttribute('src');
        if (source) frame.setAttribute('src', source);
      });
      slide?.querySelectorAll('model-viewer').forEach((viewer) => {
        if (typeof viewer.pause === 'function') viewer.pause();
      });
    }

    settle() {
      this.cancelAnimations();
      this.galleryRenderedIndex = this.galleryIndex;
      this.gallerySlides.forEach((slide, index) => {
        const selected = index === this.galleryIndex;
        slide.hidden = !selected;
        slide.inert = !selected;
        slide.classList.toggle('is-active', selected);
        if (selected) slide.removeAttribute('aria-hidden');
        else slide.setAttribute('aria-hidden', 'true');
      });
    }

    animateSlide(slide, keyframes, duration, finished) {
      const animation = slide.animate(keyframes, {
        duration,
        easing: 'cubic-bezier(.22,.61,.36,1)',
        fill: 'both'
      });
      this.galleryAnimations.add(animation);
      animation.finished.then(() => {
        this.galleryAnimations.delete(animation);
        finished?.();
        animation.cancel();
      }).catch(() => {});
    }

    async select(requestedIndex, requestedDirection, variantChange = false) {
      const total = this.gallerySlides.length;
      if (total < 2 || !Number.isFinite(requestedIndex)) return;
      const index = ((requestedIndex % total) + total) % total;
      if (index === this.galleryIndex) return;
      const previousSelection = this.galleryIndex;
      const generation = ++this.galleryGeneration;
      this.galleryIndex = index;
      this.dataset.galleryActive = String(index);
      this.updateSelection(false);
      const incoming = this.gallerySlides[index];
      const image = incoming.querySelector('img');
      if (image) {
        image.loading = 'eager';
        if (!image.complete && typeof image.decode === 'function') {
          try {
            await image.decode();
          } catch {}
        }
      }
      if (generation !== this.galleryGeneration || !this.isConnected) return;
      const previousIndex = this.galleryRenderedIndex;
      if (index === previousIndex) {
        this.settle();
        this.updateSelection(true);
        return;
      }
      const outgoing = this.gallerySlides[previousIndex];
      const outgoingStyle = window.getComputedStyle(outgoing);
      const startOpacity = outgoingStyle.opacity;
      const startTransform = outgoingStyle.transform === 'none' ? 'translateX(0px)' : outgoingStyle.transform;
      const direction = requestedDirection || (index > previousSelection ? 1 : -1);
      const distance = variantChange ? 0 : 16;
      const duration = variantChange ? 180 : 220;

      this.cancelAnimations();
      this.galleryRenderedIndex = index;
      this.gallerySlides.forEach((slide) => {
        const visible = slide === outgoing || slide === incoming;
        slide.hidden = !visible;
        slide.inert = slide !== incoming;
        slide.classList.toggle('is-active', slide === incoming);
        if (slide === incoming) slide.removeAttribute('aria-hidden');
        else slide.setAttribute('aria-hidden', 'true');
      });
      this.pauseMedia(outgoing);
      this.updateSelection(true);

      if (this.galleryReducedMotion.matches || typeof incoming.animate !== 'function') {
        this.settle();
        return;
      }

      this.animateSlide(outgoing, [
        { opacity: startOpacity, transform: startTransform },
        { opacity: 0, transform: `translateX(${-direction * distance}px)` }
      ], duration, () => {
        if (this.galleryRenderedIndex !== previousIndex) outgoing.hidden = true;
      });
      this.animateSlide(incoming, [
        { opacity: 0, transform: `translateX(${direction * distance}px)` },
        { opacity: 1, transform: 'translateX(0px)' }
      ], duration);
    }

    updateSelection(announce) {
      this.galleryThumbnails.forEach((thumbnail, index) => {
        const selected = index === this.galleryIndex;
        thumbnail.classList.toggle('is-active', selected);
        thumbnail.setAttribute('aria-current', String(selected));
      });
      const count = this.querySelector('[data-gallery-count]');
      if (count) count.textContent = String(this.galleryIndex + 1);
      const selectedThumbnail = this.galleryThumbnails[this.galleryIndex];
      const thumbnailList = this.querySelector('[data-gallery-thumbnails]');
      if (selectedThumbnail && thumbnailList && announce) {
        const thumbnailBox = selectedThumbnail.getBoundingClientRect();
        const listBox = thumbnailList.getBoundingClientRect();
        if (thumbnailBox.left < listBox.left) thumbnailList.scrollLeft -= listBox.left - thumbnailBox.left;
        else if (thumbnailBox.right > listBox.right) thumbnailList.scrollLeft += thumbnailBox.right - listBox.right;
      }
      const message = this.querySelector('[data-gallery-announcement]');
      if (message && announce) message.textContent = this.dataset.galleryMediaLabel.replace('[index]', String(this.galleryIndex + 1));
    }
  }

  customElements.define('m3d-product-gallery', M3dProductGallery);
})();
