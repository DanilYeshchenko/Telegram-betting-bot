const Markup = require('telegraf/markup');

exports.mainMenu = Markup
  .keyboard([
    ['💶 Платные прогнозы'],
    ['💳 Баланс', '👥 Рефералы'],
    ['📩 Контакты', '🔝 Наш канал']
  ])
  .resize()
  .extra();

exports.balanceMenu = Markup
  .keyboard([
    ['Пополнить'],
    ['Моя подписка'],
    ['◀️ Назад']
  ])
  .resize()
  .extra();

exports.vipMenu = Markup
  .keyboard([
    ['💠 Неделя - 500 рублей', '🎫 Месяц - 1 000 рублей'],
    ['◀️ Назад']
  ])
  .resize()
  .extra();

exports.subscriptionMenu = Markup
  .keyboard([
    ['Заморозить/разморозить подписку'],
    ['◀️ Нaзад']
  ])
  .resize()
  .extra();
