Disclamer: AI generated, think before development.

---

### Этап 1: Архитектура и Состояние (Zustand + Persistence)

Прежде чем рисовать кнопки, нужно описать, как данные будут жить в приложении.

* **Настройка Store:**
* `settings`: объект с глобальными дефолтами (цена, скидка, лимит карт, BLIK, Revolut, флаг округления).
* `friends`: массив объектов `{ id, name, isDeleted, isFavorite }`.
* `history`: массив прошлых расчетов (каждый расчет содержит снапшот имен, чтобы удаление друга не ломало историю).


* **Синхронизация:** Подключение `persist` из Zustand, чтобы данные не пропадали при обновлении страницы.

### Этап 2: Приоритет №1 — MVP (Минимально жизнеспособный продукт)

*Цель: Прийти на корт и посчитать игру прямо в браузере.*

1. **Страница «Новый расчет» (Главная):**
* **Блок параметров:** Инпуты для цены корта, количества кортов и селектор времени (1ч/1.5ч/2ч).
* **Advanced спойлер:** Скрытая секция (Mantine `Collapse`), где можно переопределить цену или скидку для текущей сессии.
* **Блок игроков:** Мультиселект или список чекбоксов из базы друзей.
* **Управление игроком:** У каждого выбранного игрока — кнопка-переключатель (0-1-2) для Multisport и выбор «Кто платил».


2. **Математическое ядро:**
* Реализация функции расчета с учетом твоих условий:
* Вычитание персональной скидки.
* Деление остатка на всех.
* **Округление вверх** (бонус плательщику).




3. **Генератор текста и Share:**
* Кнопка «Поделиться», которая формирует строку со списком долгов и реквизитами из настроек.
* Интеграция с `navigator.share`.



### Этап 3: Приоритет №2 — Настройки и Удобство

1. **Страница «Настройки» (Settings):**
* Поля для ввода постоянных реквизитов (BLIK, Revolut).
* Установка глобальных дефолтов (цена, скидка).
* Темы оформления (Mantine поддерживает темную/светлую тему из коробки).


2. **Управление друзьями:**
* Страница со списком всех друзей.
* Возможность добавить нового друга, изменить имя или «мягко» удалить.



### Этап 4: Приоритет №3 — История и PWA

1. **Страница «История»:**
* Список прошлых расчетов (Mantine `Timeline` или `Card`).
* Возможность открыть старый расчет и снова нажать «Поделиться».


2. **PWA (Progressive Web App):**
* Настройка `manifest.json` и Service Worker (через плагин `vite-plugin-pwa`).
* Добавление иконки приложения, чтобы оно открывалось без адресной строки браузера.



---

### Реализация Математики (Snippet для твоего Zustand Store)

```javascript
const calculateSquash = (players, settings) => {
  const { courtPrice, courtsCount, duration, discountValue, roundUp } = settings;
  
  const totalPrice = courtPrice * courtsCount * duration;
  const totalDiscountsCount = players.reduce((sum, p) => sum + p.msCount, 0);
  const totalDiscountAmount = totalDiscountsCount * discountValue;
  
  const amountToSplit = totalPrice - totalDiscountAmount;
  const baseShare = amountToSplit / players.length;

  let calculatedPlayers = players.map(player => {
    let toPay = baseShare - (player.msCount * discountValue);
    if (roundUp) toPay = Math.ceil(toPay);
    return { ...player, toPay };
  });

  // Корректировка суммы плательщика (бонус за округление)
  const payer = calculatedPlayers.find(p => p.isPayer);
  const othersTotal = calculatedPlayers
    .filter(p => !p.isPayer)
    .reduce((sum, p) => sum + p.toPay, 0);
  
  if (payer) {
    payer.toPay = totalPrice - totalDiscountAmount - othersTotal;
  }

  return calculatedPlayers;
};

```

### Структура файлов в проекте

* `/src/store/useSquashStore.js` — Zustand логика.
* `/src/components/`
* `Layout.jsx` — Навигация (Mantine AppShell).
* `PlayerRow.jsx` — Строка игрока с кнопками MS.
* `AdvancedSettings.jsx` — Скрытый блок настроек.


* `/src/pages/`
* `Calculator.jsx` — Главная.
* `History.jsx` — История.
* `Settings.jsx` — Настройки.
* `Friends.jsx` — База друзей.
