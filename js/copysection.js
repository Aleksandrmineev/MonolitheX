// Универсальная функция загрузки внешнего HTML‑файла
function loadHTML(id, file) {
  return fetch(file)
    .then((res) => res.text())
    .then((html) => {
      const target = document.getElementById(id);
      if (target) target.innerHTML = html;
    });
}

/* ======================
   HEADER & CITY SELECTOR
   ====================== */
function initHeader() {
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      burger.classList.toggle("is-active");
    });
  }

  const servicesLink = document.querySelector(
    ".header__menu-item--has-popup > a"
  );
  const popupWrapper = document.querySelector(".header__popup-wrapper");
  const subpopupTrg = popupWrapper?.querySelector(
    ".header__popup-item--has-subpopup"
  );
  const subpopup = popupWrapper?.querySelector(".header__subpopup");

  if (servicesLink && popupWrapper && subpopup) {
    servicesLink.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      popupWrapper.classList.toggle("is-open");
      subpopup.classList.remove("is-active");
    });

    subpopupTrg?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      subpopup.classList.toggle("is-active");
    });

    document.addEventListener("click", (e) => {
      if (
        !popupWrapper.contains(e.target) &&
        !servicesLink.contains(e.target)
      ) {
        popupWrapper.classList.remove("is-open");
        subpopup.classList.remove("is-active");
      }
    });

    popupWrapper.querySelectorAll("a").forEach((link) => {
      if (!link.classList.contains("header__popup-item--has-subpopup")) {
        link.addEventListener("click", () => {
          popupWrapper.classList.remove("is-open");
          subpopup.classList.remove("is-active");
        });
      }
    });
  }
}

function initCitySelector() {
  const toggle = document.querySelector(".header__location-toggle");
  const dropdown = document.querySelector(".header__location-dropdown");
  const current = document.querySelector(".header__location-current");
  const label = document.querySelector(".header__location-town");

  if (toggle && dropdown && current) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("is-open");
    });

    dropdown.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        current.textContent = link.dataset.city;
        dropdown.classList.remove("is-open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("is-open");
      }
    });
  }

  const updateTownText = () => {
    if (label)
      label.textContent = window.innerWidth <= 550 ? "Город:" : "Ваш город:";
  };
  window.addEventListener("resize", updateTownText);
  updateTownText();
}

/* =========================
   GRID — скрытие лишних карт
   ========================= */
function hideOverflowGridItems(gridSelector, btnSelector) {
  const grid = document.querySelector(gridSelector);
  const btn = document.querySelector(btnSelector);
  if (!grid || !btn) return;

  const cards = [...grid.querySelectorAll(".project-card")];
  const firstRowTop = cards[0].getBoundingClientRect().top;

  cards.forEach((card) => {
    if (card.getBoundingClientRect().top > firstRowTop + 5)
      card.dataset.hidden = "true";
  });

  btn.addEventListener("click", () => {
    cards.forEach((card) => card.removeAttribute("data-hidden"));
    btn.remove();
  });
}

/* =====================
   МОДАЛКА чек‑листа
   ===================== */
function initChecklistModal() {
  const modal = document.getElementById("checklistModal");
  if (!modal) return;

  const openBtns = document.querySelectorAll(".open-checklist-modal");
  const closeBtn = modal.querySelector(".modal__close");
  const overlay = modal.querySelector(".modal__overlay");

  const close = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  openBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    })
  );

  closeBtn?.addEventListener("click", close);
  overlay?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) close();
  });

  /* ===== Валидация и скачивание PDF ===== */
  const form = modal.querySelector(".checklist-modal__form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');
    const agree = form.querySelector('input[type="checkbox"]');

    if (!email.value || !agree.checked) {
      alert("Пожалуйста, введите e-mail и подтвердите согласие.");
      return;
    }

    const a = Object.assign(document.createElement("a"), {
      href: "/files/7-pravil-zakupok.pdf",
      download: "7-pravil-zakupok.pdf",
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    close();
  });
}

/* =========================
   FLOATING UI (scroll‑to‑top)
   ========================= */
function initFloatingUI() {
  const scrollBtn = document.querySelector(".scroll-to-top");
  if (!scrollBtn) return;

  scrollBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("visible", window.scrollY > 300);
  });
}

/* =========================================================
   ИНИЦИАЛИЗАЦИЯ — скрипт подключён defer, поэтому DOM уже готов
   ========================================================= */
Promise.all([
  loadHTML("header", "header.html"),
  loadHTML("footer", "footer.html"),
  loadHTML("floating-ui", "floating-ui.html"),
]).then(() => {
  initHeader();
  initCitySelector();
  initChecklistModal();
  initFloatingUI();
});

// Функции, не зависящие от асинхронной подгрузки частей
hideOverflowGridItems(".article-projects__grid", ".article-projects__more");
