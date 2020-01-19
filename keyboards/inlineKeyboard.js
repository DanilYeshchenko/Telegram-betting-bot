const Extra = require('telegraf/extra');
const config = require('../config');

exports.payButton500 = Extra.HTML().markup((m) =>
  m.inlineKeyboard([
    m.callbackButton('Оплатить', 'pay500'),
  ]));

exports.payButton1000 = Extra.HTML().markup((m) =>
  m.inlineKeyboard([
    m.callbackButton('Оплатить', 'pay1000'),
  ]));

exports.contacts = Extra.HTML().markup((m) =>
  m.inlineKeyboard([
    m.urlButton('📩 Вопросы', config.contacts)
  ]));

exports.channel = Extra.HTML().markup((m) =>
  m.inlineKeyboard([
    m.urlButton('▪Ссылка на канал', config.channel)
  ]));
