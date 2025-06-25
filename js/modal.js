document.addEventListener('DOMContentLoaded', () => {
  // Универсальные модалки по data-атрибуту
  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(btn.dataset.openModal);
      if (target) {
        target.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', () => {
      const modal = el.closest('.modal');
      modal?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach((modal) => {
        modal.classList.remove('open');
      });
      document.body.style.overflow = '';
    }
  });

  // Поддержка классового вызова (например: .open-report-modal → #reportModal)
  document.querySelectorAll('.open-report-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('reportModal');
      modal?.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Закрытие по overlay
      modal?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal__overlay')) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });

      // Закрытие по .modal__close
      modal?.querySelector('.modal__close')?.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  });
});
