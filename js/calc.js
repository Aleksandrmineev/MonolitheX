/* ====== Счётчик чисел ======
 * element   — DOM-элемент, куда пишем
 * start     — от какого числа
 * end       — до какого числа
 * duration  — длительность в мс (по умолчанию 600)
 */
function animateValue(element, start, end, duration = 600) {
  const range = end - start;
  const startTs = performance.now();

  function step(now) {
    const progress = Math.min((now - startTs) / duration, 1); // 0-1
    const value = Math.round(start + range * progress);

    element.textContent = `Итоговая стоимость: ${value.toLocaleString(
      "ru-RU"
    )} ₽`;

    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* =========================================================
 *  calc.js ― калькулятор + мессенджер-кнопки
 * =======================================================*/

/* ========= Элементы калькулятора ========= */
const workType = document.getElementById("workType");
const areaRange = document.getElementById("areaRange");
const areaInput = document.getElementById("areaInput");
const submitBtn = document.getElementById("calcSubmit");
const resultBlock = document.getElementById("calcResult");
const resultFormula = resultBlock.querySelector(".calc-result__formula");
const resultTotal = resultBlock.querySelector(".calc-result__total");
const resultNote = resultBlock.querySelector(".calc-result__note");

/* ========= Ставки за 1 м² ========= */
const PRICES = {
  km: 150, // КМ
  krpd: 300, // КР для ПД
  krrd: 400, // КР для РД
  kj: 250, // КЖ
  ar: 350, // АР
};

/* ========= Синхронизация бегунка и инпута ========= */
function syncRangeAndInput(range, input) {
  range.addEventListener("input", () => (input.value = range.value));

  input.addEventListener("input", () => {
    let v = Number(input.value);
    if (isNaN(v) || v < +range.min) v = +range.min;
    if (v > +range.max) v = +range.max;
    range.value = input.value = v;
  });
}
syncRangeAndInput(areaRange, areaInput);

/* ========= Расчёт стоимости ========= */
function calculate() {
  const type = workType.value;
  const area = Math.max(0, Math.floor(Number(areaInput.value)));
  const rate = PRICES[type] || 0;
  const total = area * rate;

  resultFormula.textContent = `Формула: ${area} м² × ${rate} ₽`;

  /* --- вместо мгновенной смены — анимированный счётчик --- */
  const currentText = resultTotal.textContent.match(/\d[\d\s]*\d/);
  const previous = currentText ? Number(currentText[0].replace(/\s/g, "")) : 0;
  animateValue(resultTotal, previous, total); // ← тут магия

  resultNote.textContent =
    "Калькулятор даёт базовую оценку, точная цена зависит от проекта";
  resultBlock.classList.add("is-visible");
}

/* ========= Кнопка «Рассчитать» ========= */
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  calculate();
});

/* =========================================================
 *  Deep-link к WhatsApp / Telegram (один для всех кнопок)
 * =======================================================*/

/* — настройки — */
const MSG = encodeURIComponent(
  "Добрый день! Пишу с сайта MonolitheX, хотел бы уточнить стоимость проектирования."
);
const WA_PHONE = "+79272092064"; // телефон WhatsApp (E.164)
const TG_USER = "czaryovv"; // ник Telegram (без @)

/* — вспомогательные функции — */
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

function openWithFallback(appURI, webURI) {
  if (isMobile) location.href = appURI; // пробуем открыть приложение
  window.open(webURI, "_blank"); // и всегда открываем веб-версию
}

/* — делегированный обработчик кликов — */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-wa],[data-tg],#waLink,#tgLink");
  if (!btn) return; // клик не по нужной кнопке

  e.preventDefault();

  if (btn.hasAttribute("data-wa") || btn.id === "waLink") {
    openWithFallback(
      `whatsapp://send?phone=${WA_PHONE}&text=${MSG}`,
      `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${MSG}`
    );
  } else {
    openWithFallback(
      `tg://resolve?domain=${TG_USER}&text=${MSG}`,
      `https://t.me/${TG_USER}?text=${MSG}`
    );
  }
});
