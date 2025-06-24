function hideOverflowGridItems(gridSelector, btnSelector) {
  const grid = document.querySelector(gridSelector);
  const btn = document.querySelector(btnSelector);
  if (!grid || !btn) return;

  const cards = grid.querySelectorAll('.project-card');
  if (!cards.length) return;

  const firstRowTop = cards[0].getBoundingClientRect().top;

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop > firstRowTop + 5) {
      // небольшой допуск
      card.dataset.hidden = 'true';
    }
  });

  btn.addEventListener('click', () => {
    cards.forEach((card) => card.removeAttribute('data-hidden'));
    btn.remove();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // ====== ИНИЦИАЛИЗАЦИЯ ПЕРВОЙ СТРОКИ СКРЫТИЕМ ======
  hideOverflowGridItems('.article-projects__grid', '.article-projects__more');

  // ====== МОДАЛЬНОЕ ОКНО ======
  const modal = document.getElementById('checklistModal');
  const openBtns = document.querySelectorAll('.open-checklist-modal');
  const closeBtn = modal?.querySelector('.modal__close');
  const overlay = modal?.querySelector('.modal__overlay');

  if (modal) {
    // Открытие
    openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    // Закрытие по крестику
    closeBtn?.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    // Закрытие по overlay
    overlay?.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    // Закрытие по клавише Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ====== ОБРАБОТКА ФОРМЫ ======
  const form = document.querySelector('.checklist-modal__form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = form.querySelector('input[type="email"]');
      const agree = form.querySelector('input[type="checkbox"]');

      // Простая валидация
      if (!email.value || !agree.checked) {
        alert('Пожалуйста, введите e-mail и подтвердите согласие.');
        return;
      }

      // Скачивание PDF
      const a = document.createElement('a');
      a.href = '/files/7-pravil-zakupok.pdf';
      a.download = '7-pravil-zakupok.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Закрытие модалки
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
