// Получаем элементы
const workType = document.getElementById('workType');
const sheetsRange = document.getElementById('sheetsRange');
const sheetsInput = document.getElementById('sheetsInput');
const tonsRange = document.getElementById('tonsRange');
const tonsInput = document.getElementById('tonsInput');
const submitBtn = document.getElementById('calcSubmit');
const resultBlock = document.getElementById('calcResult');

// Проверяем, есть ли все элементы перед запуском логики
if (
  workType &&
  sheetsRange &&
  sheetsInput &&
  tonsRange &&
  tonsInput &&
  submitBtn &&
  resultBlock
) {
  const resultFormula = resultBlock.querySelector('.calc-result__formula');
  const resultTotal = document.getElementById('calcTotal');

  const PRICES = {
    km: { ton: 500, sheet: 0, label: 'КМ' },
    kmd: { ton: 500, sheet: 300, label: 'КМД' },
    ar: { ton: 0, sheet: 550, label: 'АР' },
  };

  const MIN_TOTAL = 15000;

  // Синхронизация range и input
  function syncRangeAndInput(range, input) {
    range.addEventListener('input', () => (input.value = range.value));
    input.addEventListener('input', () => (range.value = input.value));
  }

  syncRangeAndInput(sheetsRange, sheetsInput);
  syncRangeAndInput(tonsRange, tonsInput);

  // Округление до 1000 вверх
  function roundUpToThousand(value) {
    return Math.ceil(value / 1000) * 1000;
  }

  // Основной расчёт
  function calculate() {
    const type = workType.value;
    const tons = parseFloat(tonsInput.value) || 0;
    const sheets = parseFloat(sheetsInput.value) || 0;

    const { ton, sheet } = PRICES[type];

    let total = tons * ton + sheets * sheet;
    total = total < MIN_TOTAL ? MIN_TOTAL : roundUpToThousand(total);

    // Обновление UI
    resultFormula.textContent = `Формула: (${tons} × ${ton}₽) + (${sheets} × ${sheet}₽)`;
    resultTotal.textContent = `${total.toLocaleString('ru-RU')} руб.`;

    resultBlock.classList.add('is-visible');
  }

  // Обработчик кнопки
  submitBtn.addEventListener('click', calculate);
}
