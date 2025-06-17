document.addEventListener('DOMContentLoaded', function () {
  // ВЫБОР ГОРОДОВ
  const locationToggle = document.querySelector('.header__location-toggle');
  const locationDropdown = document.querySelector('.header__location-dropdown');
  const locationCurrent = document.querySelector('.header__location-current');

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
  // ЗАМЕНИТЬ Ваш город на Город на мобилках
  function updateLocationTownText() {
    const locationTown = document.querySelector('.header__location-town');
    if (window.innerWidth <= 550) {
      locationTown.textContent = 'Город:';
    } else {
      locationTown.textContent = 'Ваш город:';
    }
  }

  window.addEventListener('resize', updateLocationTownText);
  window.addEventListener('DOMContentLoaded', updateLocationTownText);

  // Закрытие dropdown по клику вне блока
  document.addEventListener('click', function (e) {
    if (
      !locationToggle.contains(e.target) &&
      !locationDropdown.contains(e.target)
    ) {
      locationDropdown.classList.remove('is-open');
    }
  });

  const servicesMenuLink = document.querySelector(
    '.header__menu-item--has-popup > a'
  );
  const popupWrapper = document.querySelector('.header__popup-wrapper');
  const subpopup = popupWrapper.querySelector('.header__subpopup');
  const subpopupTrigger = popupWrapper.querySelector(
    '.header__popup-item--has-subpopup'
  );

  // Открываем/закрываем popup-wrapper по клику на "Услуги"
  servicesMenuLink.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    popupWrapper.classList.toggle('is-open');

    // При открытии popup — закрываем subpopup
    subpopup.classList.remove('is-active');
  });

  // Открываем/закрываем subpopup по клику на пункт с подменю
  if (subpopupTrigger && subpopup) {
    subpopupTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Переключаем текущее subpopup
      subpopup.classList.toggle('is-active');
    });
  }

  // Закрытие по клику вне popup
  document.addEventListener('click', function (e) {
    if (
      !popupWrapper.contains(e.target) &&
      !servicesMenuLink.contains(e.target)
    ) {
      popupWrapper.classList.remove('is-open');
      subpopup.classList.remove('is-active');
    }
  });

  // Закрытие popup по клику на любой пункт (ссылка), кроме триггера subpopup
  const popupLinks = popupWrapper.querySelectorAll('a');
  popupLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (link.classList.contains('header__popup-item--has-subpopup')) {
        return; // ничего не делаем
      }

      // закрываем popup
      popupWrapper.classList.remove('is-open');
      subpopup.classList.remove('is-active');
    });
  });

  // Бургер-меню
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');

  burger.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    burger.classList.toggle('is-active');
  });

  // КНОПКА НАВЕРХ
  const scrollBtn = document.querySelector('.scroll-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('is-visible');
    } else {
      scrollBtn.classList.remove('is-visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // АНИМАЦИЯ H2
  document.addEventListener('DOMContentLoaded', function () {
    const animatedEls = document.querySelectorAll('.animate-from-left');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.3, // 30% видимости
      }
    );

    animatedEls.forEach((el) => observer.observe(el));
  });
});
