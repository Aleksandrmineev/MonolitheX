// СЛАЙДЕР ПРЕСС_ЦЕНТР
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.press__slider');
  const prevBtn = document.querySelector('.slider-arrow--prev');
  const nextBtn = document.querySelector('.slider-arrow--next');

  if (!slider || !prevBtn || !nextBtn) return;

  const cardWidth = 440 + 24;
  const transitionTime = 300;

  // Клонируем крайние карточки
  const firstClone = slider.children[0].cloneNode(true);
  const lastClone = slider.children[slider.children.length - 1].cloneNode(true);
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slider.children[0]);

  // Начальная позиция — 1 карточка (реальная)
  slider.scrollLeft = cardWidth;

  // Управление
  let isTransitioning = false;

  function scrollTo(position) {
    isTransitioning = true;
    slider.scrollTo({ left: position, behavior: 'smooth' });
    setTimeout(() => {
      isTransitioning = false;

      // Перепрыгиваем если дошли до клона
      if (slider.scrollLeft <= 0) {
        slider.scrollLeft = cardWidth * (slider.children.length - 2);
      } else if (
        slider.scrollLeft >=
        cardWidth * (slider.children.length - 1)
      ) {
        slider.scrollLeft = cardWidth;
      }
    }, transitionTime);
  }

  nextBtn.addEventListener('click', () => {
    if (!isTransitioning) {
      scrollTo(slider.scrollLeft + cardWidth);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (!isTransitioning) {
      scrollTo(slider.scrollLeft - cardWidth);
    }
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
