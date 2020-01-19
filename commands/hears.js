const user = require('.././database/userDAO');
const keyboard = require('.././keyboards/keyboard');
const inlineKeyboard = require('.././keyboards/inlineKeyboard');
const config = require('../config');
const md5 = require('md5');

exports.paidForecasts = ctx => {
  return ctx.reply('Покупая VIP💎 подписку ты получаешь самый сок из прогнозов. ' +
    'Каждый день тебе в чат будут приходить лучшие ставки! С лучшими коэффициентами. ' +
    'К прогнозу прилагаются скриншоты моих ставок. Всё делается очень просто. ' +
    '\n\nВыбирай тариф. Чем дольше, тем выгоднее.  💳👇🏼' +
    '\n\nВаша подписка истекла', keyboard.vipMenu);
};

exports.week500 = ctx => {
  return ctx.reply('Подписка позволить вам получать VIP прогнозы', inlineKeyboard.payButton500)
};

exports.week1000 = ctx => {
  return ctx.reply('Подписка позволить вам получать VIP прогнозы', inlineKeyboard.payButton1000)
};

exports.balance = async ctx => {
  let balance = await user.getBalance(ctx.from.id);
  return ctx.replyWithMarkdown(`Ваш баланс для покупки подписки: ${balance} руб.\nВаш ID: *${ctx.from.id}*`, keyboard.balanceMenu);
};

exports.refill = ctx => {
  let hash = (Math.random() + '').split('.')[1].slice(0, 8);
  let sign = md5(`${config.storeID}:500:${config.storeKey}:${ctx.from.id}_${hash}`);
  return ctx.reply(`https://www.free-kassa.ru/merchant/cash.php?m=${config.storeID}&oa=500&o=${ctx.from.id}_${hash}&s=${sign}`);
};

exports.subscription = async ctx => {
  let text;
  if (await user.getVIPSubscription(ctx.from.id) == null) text = 'Отсутствует';
  else if (await user.getFreezeSubscription(ctx.from.id) != null) text = 'Заморожена';
  else text = 'Работает';
  return ctx.reply(`Меню управления подпиской\nСостояние подписки: ${text}`, keyboard.subscriptionMenu)
};

exports.freezeSubscription = async ctx => {
  if (await user.getVIPSubscription(ctx.from.id) == null) {
    return ctx.reply('Вы не можете заморозить подписку так-как у вас её нет.');
  }

  let date = await new Date();
  let freezeDate = await user.getFreezeSubscription(ctx.from.id);

  if (await user.getFreezeSubscription(ctx.from.id) != null && await (freezeDate.setDate(freezeDate.getDate() + 2)) > date) {
    return ctx.reply('Не прошло 24 часа с момента последней заморозки');
  }
  if (await user.getFreezeSubscription(ctx.from.id) != null) {
    let days = (new Date() - await user.getFreezeSubscription(ctx.from.id)) / 86400000;
    let date = await user.getVIPSubscription(ctx.from.id);

    await date.setDate(await date.getDate() + days);
    await user.setVIPSubscription(ctx.from.id, date);

    await user.setFreezeSubscription(ctx.from.id, null);
    await user.setActiveSubscription(ctx.from.id, true);

    return ctx.replyWithMarkdown(`Вы розаморозили свою подписку!\nНовая дата завершения подписки: *${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}*`);
  }

  await user.setFreezeSubscription(ctx.from.id, date);
  await user.setActiveSubscription(ctx.from.id, false);
  return ctx.reply('Вы заморозили свою подписку!');
};

exports.referrals = async ctx => {
  countReferrals = await user.getCountReferrals(ctx.from.id)
  return ctx.reply(`Количество приглашённых вами друзей: ${countReferrals}\n\n` +
    'Вот ваша ссылка для приглашения:\n' +
    `https://t.me/test532_bot?start=${ctx.from.id}` +
    '\n\nЗа каждого приглашённого друга вы получаете в качестве вознаграждения 1 руб!')
};

exports.contacts = ctx => {
  return ctx.reply('Контакты', inlineKeyboard.contacts)
};

exports.channel = ctx => {
  return ctx.reply('Наш канал', inlineKeyboard.channel)
};

exports.backToMenu = ctx => {
  return ctx.reply('Подписка позволит вам получать VIP прогнозы', keyboard.mainMenu)
};

exports.backToBalance = async ctx => {
  balance = await user.getBalance(ctx.from.id);
  return ctx.replyWithMarkdown(`Ваш баланс для покупки подписки: ${balance} руб.\nВаш ID: *${ctx.from.id}*`, keyboard.balanceMenu);
};
