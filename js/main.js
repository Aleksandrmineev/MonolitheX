import { initHeaderMenu } from "./header.js";
import { initCitySelector } from "./city.js";
import { initHeadlineAnimation } from "./animation.js";
import { initCopyEmail } from "./copyEmail.js";

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
   HELPER: Hide overflow grid items
   ========================= */
function hideOverflowGridItems(gridSelector, btnSelector) {
  const grid = document.querySelector(gridSelector);
  const btn = document.querySelector(btnSelector);
  if (!grid || !btn) return;
  const cards = Array.from(grid.querySelectorAll(".project-card"));
  if (!cards.length) return;
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
  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  closeBtn?.addEventListener("click", close);
  overlay?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) close();
  });
  const form = modal.querySelector(".checklist-modal__form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const agree = form.querySelector('input[type="checkbox"]');
    if (!emailInput.value || !agree.checked) {
      alert("Пожалуйста, введите e-mail и подтвердите согласие.");
      return;
    }
    const a = document.createElement("a");
    a.href = "/files/7-pravil-zakupok.pdf";
    a.download = "7-pravil-zakupok.pdf";
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
  // Load header first
  await loadHTML("header", "header.html");
  initHeaderMenu();
  initCopyEmail();

  // Load other fragments in parallel
  await Promise.all([
    loadHTML("footer", "footer.html"),
    loadHTML("floating-ui", "floating-ui.html"),
  ]);

  // Initialize remaining modules
  initCitySelector();
  initHeadlineAnimation();
  hideOverflowGridItems(".article-projects__grid", ".article-projects__more");
  initChecklistModal();
  initFloatingUI();
})();
