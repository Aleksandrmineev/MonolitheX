document.addEventListener('DOMContentLoaded', () => {
  // Универсальная функция инициализации горизонтального скролл-слайдера
  function initSimpleSlider(
    wrapperSelector,
    sliderSelector,
    cardSelector,
    gapDefault = 16
  ) {
    const wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) return;

    const slider = wrapper.querySelector(sliderSelector);
    const prevBtn = wrapper.querySelector('.slider-arrow--prev');
    const nextBtn = wrapper.querySelector('.slider-arrow--next');
    const card = slider?.querySelector(cardSelector);
    const cardWidth = card?.offsetWidth || 300;
    const gap = parseInt(getComputedStyle(slider).gap) || gapDefault;

    if (!slider || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -cardWidth - gap, behavior: 'smooth' });
    });
  }

  // === Слайдеры ===
  initSimpleSlider(
    '.press__slider-wrapper',
    '.press__slider',
    '.press-card',
    24
  );
  initSimpleSlider(
    '.portfolio__slider-wrapper',
    '.portfolio__grid',
    '.project-card',
    16
  );
  initSimpleSlider(
    '.certificates__slider-wrapper',
    '.certificates__grid',
    '.certificate',
    16
  );

  // === Glightbox ===
  const lightbox = GLightbox({
    selector: '.glightbox',
    loop: true,
    touchNavigation: true,
    keyboardNavigation: true,
    closeButton: true,
  });

  (() => {
    const wrapper = document.querySelector('.recommend__slider-wrapper');
    if (!wrapper) return;

    const slider = wrapper.querySelector('.recommend__slider');
    const prevBtn = wrapper.querySelector('.slider-arrow--prev');
    const nextBtn = wrapper.querySelector('.slider-arrow--next');
    const card = slider?.querySelector('.recommend-card');
    const cardWidth = card?.offsetWidth || 320;
    const gap = parseInt(getComputedStyle(slider).gap) || 24;

    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -cardWidth - gap, behavior: 'smooth' });
    });
  })();
});
