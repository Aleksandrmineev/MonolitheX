// js/header.js
// Инициализация шапки: подменю "Услуги" и бургер-меню
export function initHeaderMenu() {
  // Подменю "Услуги"
  const servicesMenuLink = document.querySelector(
    ".header__menu-item--has-popup > a"
  );
  const popupWrapper = document.querySelector(
    '.header__popup-wrapper[data-popup-wrapper="services"]'
  );
  const subpopupTrigger = popupWrapper?.querySelector(
    ".header__popup-item--has-subpopup"
  );
  const subpopup = popupWrapper?.querySelector(".header__subpopup");

  if (servicesMenuLink && popupWrapper && subpopup) {
    servicesMenuLink.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      popupWrapper.classList.toggle("is-open");
      subpopup.classList.remove("is-active");
    });

    subpopupTrigger?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      subpopup.classList.toggle("is-active");
    });

    // Закрытие по клику вне
    document.addEventListener("click", (e) => {
      if (
        !popupWrapper.contains(e.target) &&
        !servicesMenuLink.contains(e.target)
      ) {
        popupWrapper.classList.remove("is-open");
        subpopup.classList.remove("is-active");
      }
    });

    // Закрытие при клике по пунктам
    popupWrapper.querySelectorAll("a").forEach((link) => {
      if (!link.classList.contains("header__popup-item--has-subpopup")) {
        link.addEventListener("click", () => {
          popupWrapper.classList.remove("is-open");
          subpopup.classList.remove("is-active");
        });
      }
    });
  }

  // Бургер-меню
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      burger.classList.toggle("is-active");
    });
  }
}
