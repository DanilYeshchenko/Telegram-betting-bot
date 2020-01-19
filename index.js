const bot = require('./telegram');
const command = require('./commands/command');
const sms = require('./commands/admin/adminCommand');
const superAdminCommand = require('./commands/admin/superAdminCommand');
const hears = require('./commands/hears');
const action = require('./commands/action');

bot.catch((err) => {
  console.log('Ooops! Error:', err)
});

bot.hears(/^\/start (.*)$/, command.start);
bot.command('start', command.start);

bot.command('sms', sms);

bot.command('donate', superAdminCommand.donate);
bot.command('deleteUser', superAdminCommand.deleteUser);
bot.command('giveAdmin', superAdminCommand.giveAdmin);
bot.command('deleteAdmin', superAdminCommand.deleteAdmin);

bot.hears('💶 Платные прогнозы', hears.paidForecasts);
bot.hears('💠 Неделя - 500 рублей', hears.week500);
bot.hears('🎫 Месяц - 1 000 рублей', hears.week1000);

bot.hears('💳 Баланс', hears.balance);
bot.hears('Пополнить', hears.refill);
bot.hears('Моя подписка', hears.subscription);
bot.hears('Заморозить/разморозить подписку', hears.freezeSubscription);
bot.hears('◀️ Назад', hears.backToMenu);
bot.hears('◀️ Нaзад', hears.backToBalance);

bot.hears('👥 Рефералы', hears.referrals);

bot.hears('📩 Контакты', hears.contacts);

bot.hears('🔝 Наш канал', hears.channel);

bot.action('pay500', action.pay500);

bot.action('pay1000', action.pay1000);

bot.on('text', (ctx) => ctx.reply('Подписка позволит вам получать VIP прогнозы'));

setInterval(action.сheckSubscriptions, 3600000);

bot.launch();
