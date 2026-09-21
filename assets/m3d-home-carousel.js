(() => {
  const SELECTOR = '[data-m3d-hero-carousel]';
  const TRANSITION_MS = 560;

  const initialize = (carousel) => {
    if (carousel.dataset.m3dCarouselReady === 'true') return;

    const slides = Array.from(carousel.querySelectorAll('[data-m3d-hero-slide]'));
    const dots = Array.from(carousel.querySelectorAll('[data-m3d-hero-dot]'));
    if (slides.length < 2 || slides.length !== dots.length) return;

    carousel.dataset.m3dCarouselReady = 'true';
    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    let timer = 0;
    let cleanupTimer = 0;
    let transitionRequest = 0;
    let paused = false;
    const interval = Math.max(4000, Number.parseInt(carousel.dataset.interval, 10) || 6500);

    const slideReady = slides.map((slide) => {
      const images = Array.from(slide.querySelectorAll('img'));
      if (images.length === 0) return Promise.resolve(true);

      return Promise.all(images.map((image) => new Promise((resolve) => {
        const finish = () => {
          if (!image.naturalWidth) {
            resolve(false);
            return;
          }

          if (typeof image.decode !== 'function') {
            resolve(true);
            return;
          }

          image.decode().then(() => resolve(true)).catch(() => resolve(image.naturalWidth > 0));
        };

        if (image.complete) {
          finish();
          return;
        }

        image.addEventListener('load', finish, { once: true });
        image.addEventListener('error', () => resolve(false), { once: true });
      }))).then((results) => results.every(Boolean));
    });

    const updateDots = () => {
      dots.forEach((dot, index) => dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false'));
    };

    const clearSlideClasses = (slide) => {
      slide.classList.remove('is-active', 'is-entering', 'is-leaving-next', 'is-leaving-previous');
      delete slide.dataset.slideDirection;
    };

    const schedule = () => {
      window.clearTimeout(timer);
      if (paused || document.hidden) return;
      timer = window.setTimeout(() => show((activeIndex + 1) % slides.length, 'next'), interval);
    };

    const show = (nextIndex, requestedDirection) => {
      const request = ++transitionRequest;
      if (nextIndex === activeIndex || nextIndex < 0 || nextIndex >= slides.length) {
        schedule();
        return;
      }

      window.clearTimeout(timer);
      slideReady[nextIndex].then((ready) => {
        if (request !== transitionRequest) return;
        if (!ready) {
          schedule();
          return;
        }

        window.clearTimeout(cleanupTimer);
        const previousIndex = activeIndex;
        const outgoing = slides[previousIndex];
        const incoming = slides[nextIndex];
        const direction = requestedDirection || (nextIndex > previousIndex ? 'next' : 'previous');

        slides.forEach((slide, index) => {
          if (index !== previousIndex && index !== nextIndex) {
            clearSlideClasses(slide);
            slide.setAttribute('aria-hidden', 'true');
          }
        });

        clearSlideClasses(outgoing);
        clearSlideClasses(incoming);
        outgoing.classList.add(direction === 'next' ? 'is-leaving-next' : 'is-leaving-previous');
        outgoing.setAttribute('aria-hidden', 'true');

        incoming.dataset.slideDirection = direction;
        incoming.classList.add('is-entering');
        incoming.setAttribute('aria-hidden', 'false');
        void incoming.offsetWidth;
        incoming.classList.add('is-active');
        incoming.classList.remove('is-entering');

        activeIndex = nextIndex;
        updateDots();
        cleanupTimer = window.setTimeout(() => clearSlideClasses(outgoing), TRANSITION_MS);
        schedule();
      });
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => show(index, index > activeIndex ? 'next' : 'previous'));
    });

    carousel.addEventListener('pointerenter', () => {
      paused = true;
      window.clearTimeout(timer);
    });
    carousel.addEventListener('pointerleave', () => {
      paused = false;
      schedule();
    });
    carousel.addEventListener('focusin', () => {
      paused = true;
      window.clearTimeout(timer);
    });
    carousel.addEventListener('focusout', (event) => {
      if (carousel.contains(event.relatedTarget)) return;
      paused = false;
      schedule();
    });
    document.addEventListener('visibilitychange', schedule);

    updateDots();
    schedule();
  };

  const initializeAll = (root = document) => root.querySelectorAll(SELECTOR).forEach(initialize);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeAll(), { once: true });
  } else {
    initializeAll();
  }

  document.addEventListener('shopify:section:load', (event) => initializeAll(event.target));
})();
