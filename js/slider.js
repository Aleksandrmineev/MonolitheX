document.addEventListener('DOMContentLoaded', () => {
  // === СЛАЙДЕР ПРЕСС-ЦЕНТР ===
  (() => {
    const wrapper = document.querySelector('.press__slider-wrapper');
    if (!wrapper) return;

    const slider = wrapper.querySelector('.press__slider');
    const prevBtn = wrapper.querySelector('.slider-arrow--prev');
    const nextBtn = wrapper.querySelector('.slider-arrow--next');
    const card = slider?.querySelector('.press-card');
    const cardWidth = card?.offsetWidth || 300;
    const gap = parseInt(getComputedStyle(slider).gap) || 24;

    if (!slider || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -cardWidth - gap, behavior: 'smooth' });
    });
  })();

  // === СЛАЙДЕР ПОРТФОЛИО ===
  (() => {
    const wrapper = document.querySelector('.portfolio__slider-wrapper');
    if (!wrapper) return;

    const slider = wrapper.querySelector('.portfolio__grid');
    const prevBtn = wrapper.querySelector('.slider-arrow--prev');
    const nextBtn = wrapper.querySelector('.slider-arrow--next');
    const card = slider?.querySelector('.project-card');
    const cardWidth = card?.offsetWidth || 300;
    const gap = parseInt(getComputedStyle(slider).gap) || 16;

    if (!slider || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -cardWidth - gap, behavior: 'smooth' });
    });
  })();

  // === СЛАЙДЕР СЕРТИФИКАТЫ ===
  (() => {
    const wrapper = document.querySelector('.certificates__slider-wrapper');
    if (!wrapper) return;

    const slider = wrapper.querySelector('.certificates__grid');
    const prevBtn = wrapper.querySelector('.slider-arrow--prev');
    const nextBtn = wrapper.querySelector('.slider-arrow--next');
    const card = slider?.querySelector('.certificate');
    const cardWidth = card?.offsetWidth || 260;
    const gap = parseInt(getComputedStyle(slider).gap) || 16;

    if (!slider || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -cardWidth - gap, behavior: 'smooth' });
    });
  })();
});
