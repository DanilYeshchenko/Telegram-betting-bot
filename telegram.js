const Telegraf = require('telegraf');
const config = require('./config');

module.exports = new Telegraf(config.token);
