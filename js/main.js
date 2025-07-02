import { initHeaderMenu } from "./header.js";
import { initCitySelector } from "./city.js";
import { initHeadlineAnimation } from "./animation.js";

/* =========================
   HELPER: Load external HTML fragment
   ========================= */
function loadHTML(id, file) {
  return fetch(file)
    .then((res) => res.text())
    .then((html) => {
      const target = document.getElementById(id);
      if (target) target.innerHTML = html;
    });
}

/* =========================
   HELPER: Copy Email & Tooltip
   ========================= */
function initCopyEmail() {
  const emailLink = document.querySelector(".copy-email");
  const tooltip = document.getElementById("emailTooltip");
  if (!emailLink || !tooltip) return;

  emailLink.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailLink.dataset.email || emailLink.textContent.trim();

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(email)
        .then(() => showTooltip("Скопировано!"))
        .catch(() => showTooltip("Не получилось – копируйте вручную"));
    } else {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      showTooltip("Скопировано!");
    }
  });

  function showTooltip(msg) {
    tooltip.textContent = msg;
    const rect = emailLink.getBoundingClientRect();
    tooltip.style.top = `${rect.top + window.scrollY - 36}px`;
    tooltip.style.left = `${
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2
    }px`;
    tooltip.classList.add("visible");
    clearTimeout(showTooltip._timer);
    showTooltip._timer = setTimeout(
      () => tooltip.classList.remove("visible"),
      2000
    );
  }
}

/* =========================
   HELPER: Hide overflow grid items
   ========================= */
function hideOverflowGridItems(gridSelector, btnSelector) {
  const grid = document.querySelector(gridSelector);
  const btn = document.querySelector(btnSelector);
  if (!grid || !btn) return;

  const cards = Array.from(grid.querySelectorAll(".project-card"));
  const firstTop = cards[0].getBoundingClientRect().top;

  cards.forEach((card) => {
    if (card.getBoundingClientRect().top > firstTop + 5) {
      card.dataset.hidden = "true";
    }
  });

  btn.addEventListener("click", () => {
    cards.forEach((card) => card.removeAttribute("data-hidden"));
    btn.remove();
  });
}

/* =========================
   HELPER: Checklist Modal
   ========================= */
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
   HELPER: Floating UI (scroll-to-top)
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

/* =========================
   MAIN INIT SEQUENCE
   ========================= */
(async () => {
  await Promise.all([
    loadHTML("header", "header.html"),
    loadHTML("footer", "footer.html"),
    loadHTML("floating-ui", "floating-ui.html"),
  ]);

  // Initialize header menu after header is loaded
  initHeaderMenu();
  initCitySelector();
  initCopyEmail();
  initHeadlineAnimation();
  hideOverflowGridItems(".article-projects__grid", ".article-projects__more");
  initChecklistModal();
  initFloatingUI();
})();
