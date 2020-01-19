const user = require('.././database/userDAO');

async function pay(ctx, money, day) {
  let date;
  await ctx.deleteMessage();
  if (await user.getBalance(ctx.from.id) < money) return ctx.reply('Недостаточно средств');
  await user.changeBalance(ctx.from.id, Math.abs(money));

  if (await user.getVIPSubscription(ctx.from.id) == null) date = await new Date();
  else date = await user.getVIPSubscription(ctx.from.id);

  await date.setDate(await date.getDate() + day);
  await user.setVIPSubscription(ctx.from.id, date);
  await user.setActiveSubscription(ctx.from.id, true);
  return ctx.replyWithMarkdown(`Отлично! Ваша VIP подписка действительна до *${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}*`);
}

exports.pay500 = async (ctx) => {
  return pay(ctx, -500, 7);
}

exports.pay1000 = async (ctx) => {
  return pay(ctx, -1000, 30);
}

exports.сheckSubscriptions = async function () {
  let users = await user.findAllUsers();
  for (let i = 0; i < users.length; i++) {
    if (await user.getActiveSubscription(users[i]) != false)
      if (await user.getVIPSubscription(users[i]) < new Date()) {
        await user.setActiveSubscription(users[i], false);
        await user.setVIPSubscription(users[i], null);
        await bot.telegram.sendMessage(users[i], 'Время вашей VIP подписки истекло.')
          .catch(err => console.error(err))
      }
  }
}
