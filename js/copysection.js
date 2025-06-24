document.addEventListener('DOMContentLoaded', () => {
  // Универсальная функция загрузки внешнего HTML-файла
  function loadHTML(id, file) {
    return fetch(file)
      .then((res) => res.text())
      .then((html) => {
        document.getElementById(id).innerHTML = html;
      });
  }
  // выбор города, инициализация
  loadHTML('header', 'header.html').then(() => {
    initHeader();
    initCitySelector(); // добавляем инициализацию выбора города
  });

  function initCitySelector() {
    const locationToggle = document.querySelector('.header__location-toggle');
    const locationDropdown = document.querySelector(
      '.header__location-dropdown'
    );
    const locationCurrent = document.querySelector('.header__location-current');

    if (locationToggle && locationDropdown && locationCurrent) {
      locationToggle.addEventListener('click', function (e) {
        e.preventDefault();
        locationDropdown.classList.toggle('is-open');
      });

      locationDropdown.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const selectedCity = this.dataset.city;
          locationCurrent.textContent = selectedCity;
          locationDropdown.classList.remove('is-open');
        });
      });

      // Закрытие при клике вне блока
      document.addEventListener('click', function (e) {
        if (
          !locationToggle.contains(e.target) &&
          !locationDropdown.contains(e.target)
        ) {
          locationDropdown.classList.remove('is-open');
        }
      });
    }

    // Изменение текста "Ваш город" на "Город:"
    const locationTown = document.querySelector('.header__location-town');
    if (locationTown) {
      function updateLocationTownText() {
        locationTown.textContent =
          window.innerWidth <= 550 ? 'Город:' : 'Ваш город:';
      }

      window.addEventListener('resize', updateLocationTownText);
      updateLocationTownText();
    }
  }

  // ===================
  // ЗАГРУЗКА HEADER
  // ===================
  loadHTML('header', 'header.html').then(() => {
    initHeader();
    initCitySelector();
  });

  // ===================
  // ЗАГРУЗКА FOOTER
  // ===================
  loadHTML('footer', 'footer.html');

  // ===================
  // FLOATING UI (scroll-to-top и контакты)
  // ===================
  loadHTML('floating-ui', 'floating-ui.html').then(() => {
    const scrollBtn = document.querySelector('.scroll-to-top');

    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      });
    }
  });

  // ===================
  // ВСТАВКА ФОРМ ИЗ ШАБЛОНА
  // ===================
  const template = document.getElementById('form-template');
  const insert1 = document.getElementById('insert-form-section-1');
  const insert2 = document.getElementById('insert-form-section-2');

  if (template) {
    if (insert1) {
      const clone1 = template.content.cloneNode(true);
      insert1.appendChild(clone1);
    }

    if (insert2) {
      const clone2 = template.content.cloneNode(true);
      insert2.appendChild(clone2);
    }

    // Вставка в .form-placeholder
    const inlinePlaceholders = document.querySelectorAll(
      '.form-placeholder[data-form="inline"]'
    );

    inlinePlaceholders.forEach((placeholder) => {
      const clone = template.content.cloneNode(true);
      placeholder.replaceWith(clone);
    });

    // ВСТАВКА ПЕРЕД ПОСЛЕДНИМ H2 В article__main
    const article = document.querySelector('.article__main');
    if (article) {
      const h2s = article.querySelectorAll('h2');
      if (h2s.length > 0) {
        const lastH2 = h2s[h2s.length - 2];
        const clone = template.content.cloneNode(true);
        article.insertBefore(clone, lastH2); // ✅ корректно вставляет DocumentFragment
      }
    }
  }

  // ===================
  // ИНИЦИАЛИЗАЦИЯ HEADER (бургер + меню "Услуги")
  // ===================
  function initHeader() {
    // Бургер-меню
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');

    if (burger && nav) {
      burger.addEventListener('click', () => {
        nav.classList.toggle('is-open');
        burger.classList.toggle('is-active');
      });
    }

    // Меню "Услуги"
    const servicesMenuLink = document.querySelector(
      '.header__menu-item--has-popup > a'
    );
    const popupWrapper = document.querySelector('.header__popup-wrapper');
    const subpopupTrigger = popupWrapper?.querySelector(
      '.header__popup-item--has-subpopup'
    );
    const subpopup = popupWrapper?.querySelector('.header__subpopup');

    if (servicesMenuLink && popupWrapper && subpopup) {
      servicesMenuLink.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        popupWrapper.classList.toggle('is-open');
        subpopup.classList.remove('is-active');
      });

      if (subpopupTrigger) {
        subpopupTrigger.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          subpopup.classList.toggle('is-active');
        });
      }

      document.addEventListener('click', function (e) {
        if (
          !popupWrapper.contains(e.target) &&
          !servicesMenuLink.contains(e.target)
        ) {
          popupWrapper.classList.remove('is-open');
          subpopup.classList.remove('is-active');
        }
      });

      const popupLinks = popupWrapper.querySelectorAll('a');
      popupLinks.forEach(function (link) {
        if (!link.classList.contains('header__popup-item--has-subpopup')) {
          link.addEventListener('click', function () {
            popupWrapper.classList.remove('is-open');
            subpopup.classList.remove('is-active');
          });
        }
      });
    }
  }
});
