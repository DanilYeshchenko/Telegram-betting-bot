const user = require('../.././database/userDAO');
const admin = require('../.././database/adminDAO');

module.exports = async ctx => {
  if (await admin.checkAdmin(ctx.from.id) == false)
    return ctx.reply(`Подписка позволит вам получать VIP прогнозы`);

  let sms = await ctx.message.text.split('/sms ')[1];
  let users = await user.findAllUsers();

  if (sms == null)
    return ctx.reply('Чтобы отправить сообщение подписчикам, используйте формат:\n/sms TEXT\n\nНапример: /sms Hello!');

  for (var i = 0; i < users.length; i++) {
    if (await user.getActiveSubscription(users[i]))
      await ctx.telegram.sendMessage(users[i], sms)
        .catch(err => console.error(err))
  }
};
