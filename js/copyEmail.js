// js/copyEmail.js

/**
 * Инициализация делегированного копирования e-mail из шапки
 * и показа тултипа.
 * Работает вне зависимости от того, когда именно вставлена шапка.
 */
export function initCopyEmail() {
  // Убедимся, что тултип есть (или создадим свой)
  let tooltip = document.getElementById("emailTooltip");
  if (!tooltip) {
    tooltip = document.createElement("span");
    tooltip.id = "emailTooltip";
    tooltip.className = "email-tooltip";
    document.body.appendChild(tooltip);
  }

  document.body.addEventListener("click", (e) => {
    // Ловим клик на любой вложенной кнопке .copy-email
    const link = e.target.closest(".copy-email");
    if (!link) return;
    e.preventDefault();

    const email = (link.dataset.email || link.textContent).trim();

    // Стараемся использовать Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).catch(() => fallbackCopy(email));
    } else {
      fallbackCopy(email);
    }

    // Показываем тултип над ссылкой
    const rect = link.getBoundingClientRect();
    tooltip.textContent = "Скопировано!";
    tooltip.style.top = `${rect.top + window.scrollY - 36}px`;
    tooltip.style.left = `${
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2
    }px`;
    tooltip.classList.add("visible");
    clearTimeout(showTimer);
    var showTimer = setTimeout(() => tooltip.classList.remove("visible"), 2000);
  });

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}
