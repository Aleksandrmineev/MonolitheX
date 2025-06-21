export function initHeaderMenu() {
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

  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      burger.classList.toggle('is-active');
    });
  }
}
