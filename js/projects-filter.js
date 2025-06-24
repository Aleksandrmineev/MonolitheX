document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.projects-filter__toggle');
  const filter = document.querySelector('.projects-filter');

  if (toggleBtn && filter) {
    toggleBtn.addEventListener('click', () => {
      filter.classList.toggle('is-open');
      toggleBtn.classList.toggle('active');
    });
  }

  const cards = document.querySelectorAll('.project-item');
  const isBlogPage = document.body.classList.contains('page-blog');

  if (isBlogPage) {
    // Показываем все карточки без пагинации
    cards.forEach((card) => {
      card.style.display = 'flex';
      card.classList.add('visible');
    });
  } else {
    const itemsPerPage = 4;
    const pages = Math.ceil(cards.length / itemsPerPage);

    const prevBtn = document.querySelector('.projects-pagination__prev');
    const nextBtn = document.querySelector('.projects-pagination__next');
    const pageBtns = document.querySelectorAll('.projects-pagination__page');

    function showPage(page) {
      cards.forEach((card, index) => {
        const inPageRange =
          index >= (page - 1) * itemsPerPage && index < page * itemsPerPage;

        if (inPageRange) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.classList.add('visible');
          });
        } else {
          card.classList.remove('visible');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });

      pageBtns.forEach((btn, i) => {
        btn.classList.toggle('is-active', i === page - 1);
      });

      if (prevBtn && nextBtn) {
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === pages;
      }

      const projectsBlock = document.getElementById('projects-block');
      if (projectsBlock) {
        projectsBlock.scrollIntoView({ behavior: 'smooth' });
      }
    }

    pageBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        showPage(i + 1);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const current = document.querySelector(
          '.projects-pagination__page.is-active'
        );
        const page = parseInt(current.textContent);
        if (page > 1) showPage(page - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const current = document.querySelector(
          '.projects-pagination__page.is-active'
        );
        const page = parseInt(current.textContent);
        if (page < pages) showPage(page + 1);
      });
    }

    document
      .querySelectorAll('.projects-pagination__list button')
      .forEach((btn) => {
        btn.addEventListener('click', () => {
          btn.classList.add('clicked');
          setTimeout(() => btn.classList.remove('clicked'), 300);
        });
      });

    showPage(1);
  }
});
