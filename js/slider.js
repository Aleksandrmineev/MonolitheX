// СЛАЙДЕР ПРЕСС_ЦЕНТР
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.press__slider');
  const wrapper = document.querySelector('.press__slider-wrapper');
  const prevBtn = wrapper.querySelector('.slider-arrow--prev');
  const nextBtn = wrapper.querySelector('.slider-arrow--next');

  if (!slider || !prevBtn || !nextBtn) return;

  const card = slider.querySelector('.press-card');
  const cardWidth = card?.offsetWidth || 300;
  const gap = parseInt(getComputedStyle(slider).gap) || 24;

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -cardWidth - gap, behavior: 'smooth' });
  });
});

// СЛАЙДЕР С ПОРТФОЛИО, ФУНКЦИОНАЛ ДЛЯ АДАПТИВА
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.portfolio__grid');
  const prevBtn = document.querySelector('.slider-arrow--prev');
  const nextBtn = document.querySelector('.slider-arrow--next');

  if (!slider || !prevBtn || !nextBtn) return;

  const cardWidth = slider.querySelector('.project-card')?.offsetWidth || 300;
  const gap = parseInt(getComputedStyle(slider).gap) || 16;

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -cardWidth - gap, behavior: 'smooth' });
  });
});
// СЛАЙДЕР СЕРТИФИКАТЫ, ФУНКЦИОНАЛ ДЛЯ АДАПТИВА
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.certificates__grid');
  const prevBtn = document.querySelector(
    '.certificates__slider-wrapper .slider-arrow--prev'
  );
  const nextBtn = document.querySelector(
    '.certificates__slider-wrapper .slider-arrow--next'
  );

  if (!slider || !prevBtn || !nextBtn) return;

  const itemWidth = slider.querySelector('.certificate')?.offsetWidth || 260;
  const gap = parseInt(getComputedStyle(slider).gap) || 16;

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -itemWidth - gap, behavior: 'smooth' });
  });
});
