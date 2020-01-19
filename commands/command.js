const user = require('.././database/userDAO');
const keyboard = require('.././keyboards/keyboard');

exports.start = async ctx => {
  if (await user.checkUser(ctx.from.id) == false) {
    await user.createUser(ctx.from.id);

    if (ctx.match != null) {
      await user.changeCountReferrals(ctx.match[1]);
      await user.changeBalance(ctx.match[1], 1);
      await ctx.telegram.sendMessage(ctx.match[1], 'По вашей рефералке перешел человек. Вы получили 1 руб.')
        .catch(err => console.error(err));
    }
  }

  return ctx.reply('Подписка позволит вам получать VIP прогнозы', keyboard.mainMenu);
};
