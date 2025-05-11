// Початкові значення
let usdRate = 30000; // курс біткоїна у доларах
let usdAmount = 1000; // сума в доларах

// Отримуємо елементи DOM
const header = document.getElementById('header');
const rateDisplay = document.getElementById('rateDisplay');
const amountDisplay = document.getElementById('amountDisplay');
const btcAmountElem = document.getElementById('btcAmount');

const editTitleBtn = document.getElementById('editTitleBtn');
const editRateBtn = document.getElementById('editRateBtn');
const editAmountBtn = document.getElementById('editAmountBtn');

const resultDiv = document.getElementById('result');

// Оновлюємо підсумки періодично
updateResult();

// Визначаємо функцію для оновлення розрахунку
function updateResult() {
  const btcAmount = usdAmount / usdRate;
  btcAmountElem.textContent = btcAmount.toFixed(8);
}

// Функцію для входу в режим редагування
function enableEditing(element, value) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.className = 'editable';

  // Функція для збереження значення
  function save() {
    const newVal = input.value.trim();
    if (element.id === 'rateDisplay') {
      const num = parseFloat(newVal);
      if (!isNaN(num) && num > 0) {
        usdRate = num;
        rateDisplay.textContent = usdRate;
      } else {
        rateDisplay.textContent = usdRate; // повернути попереднє
      }
    } else if (element.id === 'amountDisplay') {
      const num = parseFloat(newVal);
      if (!isNaN(num) && num >= 0) {
        usdAmount = num;
        amountDisplay.textContent = usdAmount;
      } else {
        amountDisplay.textContent = usdAmount; // повернути попереднє
      }
    } else if (element.id === 'header') {
      header.textContent = newVal || 'Конвертер валюти: USD → BTC';
    }
    // Відновлення елемента
    element.innerHTML = element.originalText;
    attachEditButton(element, false);
    updateResult();
  }

  // Обробка натискання Enter або Blur
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      save();
    } else if (e.key === 'Escape') {
      // Вийти без збереження
      element.innerHTML = element.originalText;
      attachEditButton(element, false);
    }
  });
  input.addEventListener('blur', () => {
    save();
  });

  // Замінюємо на input
  element.innerHTML = '';
  element.appendChild(input);
  input.focus();

  // Зберігаємо поточний текст для повернення
  if (element.id === 'header') {
    element.originalText = header.textContent;
  } else if (element.id === 'rateDisplay') {
    element.originalText = rateDisplay.textContent;
  } else if (element.id === 'amountDisplay') {
    element.originalText = amountDisplay.textContent;
  }
}

// Функція для додавання кнопки редагування і підтримки перемикання режимів
function attachEditButton(element, isActive) {
  if (isActive) {
    // Тут ви можете зробити будь-який додатковий стиль
  } else {
    // Відновлюємо кнопку
  }
}

// Обробники кнопок редагування
document.getElementById('editTitleBtn').addEventListener('click', () => {
  enableEditing(header, header.textContent);
});

document.getElementById('editRateBtn').addEventListener('click', () => {
  enableEditing(rateDisplay, rateDisplay.textContent);
});

document.getElementById('editAmountBtn').addEventListener('click', () => {
  enableEditing(amountDisplay, amountDisplay.textContent);
});

// Додаємо слухачі змін
rateDisplay.addEventListener('click', () => {
  enableEditing(rateDisplay, rateDisplay.textContent);
});
amountDisplay.addEventListener('click', () => {
  enableEditing(amountDisplay, amountDisplay.textContent);
});
header.addEventListener('click', () => {
  enableEditing(header, header.textContent);
});