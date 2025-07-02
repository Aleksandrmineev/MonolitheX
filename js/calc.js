// ======== Элементы ========
const workType = document.getElementById("workType");
const areaRange = document.getElementById("areaRange");
const areaInput = document.getElementById("areaInput");
const submitBtn = document.getElementById("calcSubmit");
const resultBlock = document.getElementById("calcResult");
const resultFormula = resultBlock.querySelector(".calc-result__formula");
const resultTotal = resultBlock.querySelector(".calc-result__total");
const resultNote = resultBlock.querySelector(".calc-result__note");

// ======== Ставки за 1 м² ========
const PRICES = {
  km: 150, // КМ
  krpd: 300, // КР для ПД
  krrd: 400, // КР для РД
  kj: 250, // КЖ
  ar: 350, // АР
};

// ======== Синхронизация бегунка и текстового поля ========
function syncRangeAndInput(range, input) {
  range.addEventListener("input", () => (input.value = range.value));
  input.addEventListener("input", () => {
    let v = Number(input.value);
    if (isNaN(v) || v < +range.min) v = range.min;
    if (v > +range.max) v = range.max;
    range.value = input.value = v;
  });
}
syncRangeAndInput(areaRange, areaInput);

// ======== Расчёт ========
function calculate() {
  const type = workType.value;
  const area = Math.max(0, Math.floor(Number(areaInput.value)));
  const rate = PRICES[type] || 0;
  const total = area * rate;

  // Обновляем UI
  resultFormula.textContent = `Формула: ${area} м² × ${rate} ₽`;
  resultTotal.textContent = `Итоговая стоимость: ${total.toLocaleString(
    "ru-RU"
  )} ₽`;
  resultNote.textContent =
    "Калькулятор даёт базовую оценку, точная цена зависит от проекта";

  resultBlock.classList.add("is-visible");
}

// ======== Навешиваем обработчик ========
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  calculate();
});

// ====== Deep link + fallback logic ======
(function () {
  const message = encodeURIComponent(
    "Добрый день, я с сайта MonolitheX, хотел бы уточнить стоимость проектирования."
  );
  const waPhone = "+4368181289405"; // номер в формате E.164
  const tgUser = "sa_ttt"; // ник менеджера в Telegram

  const waBtn = document.getElementById("waLink");
  const tgBtn = document.getElementById("tgLink");

  function openWhatsApp(e) {
    e.preventDefault();
    const uriApp = `whatsapp://send?phone=${waPhone}&text=${message}`;
    const uriWeb = `https://api.whatsapp.com/send?phone=${waPhone}&text=${message}`;

    // Если это мобильное устройство, пробуем открыть приложение
    if (/Android|iPhone|iPad|iPod/.test(navigator.userAgent)) {
      window.location.href = uriApp;
    }
    // Всегда открываем web-фоллбек в новой вкладке
    window.open(uriWeb, "_blank");
  }

  function openTelegram(e) {
    e.preventDefault();
    const uriApp = `tg://resolve?domain=${tgUser}&text=${message}`;
    const uriWeb = `https://t.me/${tgUser}?text=${message}`;

    if (/Android|iPhone|iPad|iPod/.test(navigator.userAgent)) {
      window.location.href = uriApp;
    }
    window.open(uriWeb, "_blank");
  }

  waBtn.addEventListener("click", openWhatsApp);
  tgBtn.addEventListener("click", openTelegram);
})();
