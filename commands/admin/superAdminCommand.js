const user = require('../.././database/userDAO');
const admin = require('../.././database/adminDAO');

async function checkSuperUser(ctx) {
  if (await admin.checkAdmin(ctx.from.id) == false || await admin.checkSuperUser(ctx.from.id) == false) {
    await ctx.reply(`Подписка позволит вам получать VIP прогнозы`);
    return 1;
  }
}

async function checkUser(ctx, id) {
  if (await user.checkUser(id) == false) {
    await ctx.reply(`Данного пользователя не существует, проверьте правильность введенных данных`);
    return 1;
  }
}

async function checkId(ctx, id, x) {
  if (id == null) {
    let txt1 = `Чтобы удалить пользователя, используйте формат:\n/deleteUser idTelegram\n\nНапример: /deleteUser 526086989`;
    let txt2 = `Чтобы предоставить пользователю права администратора, используйте формат:\n/giveAdmin idTelegram\n\nНапример: /giveAdmin 526086989`;
    let txt3 = `Чтобы забрать у пользователя права администратора, используйте формат:\n/deleteAdmin idTelegram\n\nНапример: /deleteAdmin 526086989`;
    switch (x) {
      case 1:
        await ctx.reply(txt1);
        break;
      case 2:
        await ctx.reply(txt2);
        break;
      case 3:
        await ctx.reply(txt3);
        break;
    }
    return 1;
  }
}

async function checkInputData(ctx, id) {
  if (isNaN(id)) {
    await ctx.reply(`Ошибка! Проверьте правильность введенных данных`);
    return 1;
  }
}

/* Only for super */
exports.donate = async ctx => {
  if (await checkSuperUser(ctx) == 1) return;

  let id = await ctx.message.text.split(' ')[1];
  let donate = await ctx.message.text.split(' ')[2];

  if (id == null || donate == null) {
    return ctx.reply(`Чтобы пополнить баланс пользователя, используйте формат:\n/donate idTelegram money\n\n` +
      'Например: /donate 526086989 1000');
  }
  if (isNaN(id) || isNaN(donate) || donate == 0) {
    return ctx.reply(`Ошибка! Проверьте правильность введенных данных`);
  }
  if (await checkUser(ctx, id) == 1) return;
  if (donate < 0 && await user.getBalance(id) < Math.abs(donate)) {
    return ctx.reply(`Ошибка! Баланс пользователя не может быть отрицательным.`);
  }

  await user.changeBalance(id, +donate);
  if (donate < 0) return ctx.reply(`Пользователь ${id} был лишен ${Math.abs(donate)} руб.`);
  await ctx.telegram.sendMessage(id, `Ваш счет был пополнен на ${donate} руб.`)
    .catch(err => console.error(err))
  return ctx.reply(`Вы пополнили баланс пользователю ${id} на ${donate} руб.`);
};

exports.deleteUser = async ctx => {
  if (await checkSuperUser(ctx) == 1) return;

  let d = await ctx.message.text.split(' ')[1];

  if (await checkId(ctx, id, 1) == 1) return;
  if (await checkInputData(ctx, id) == 1) return;
  if (await checkUser(ctx, id) == 1) return;

  if (await admin.checkAdmin(id) == true) await admin.deleteAdmin(id);
  await user.deleteUser(id);
  return ctx.reply(`Пользователь ${id} был удален`);
};

exports.giveAdmin = async ctx => {
  if (await checkSuperUser(ctx) == 1) return;

  let id = await ctx.message.text.split(' ')[1];

  if (await checkId(ctx, id, 2) == 1) return;
  if (await checkInputData(ctx, id) == 1) return;
  if (await checkUser(ctx, id) == 1) return;
  if (await admin.checkAdmin(id) == true) {
    return ctx.reply(`Этот пользователь уже имеет права администратора`);
  }

  await admin.createAdmin(id);
  return ctx.reply(`Вы предоставили пользователю ${id} права администратора`);
};

exports.deleteAdmin = async ctx => {
  if (await checkSuperUser(ctx) == 1) return;

  let id = await ctx.message.text.split(' ')[1];

  if (await checkId(ctx, id, 3) == 1) return;
  if (await checkInputData(ctx, id) == 1) return;
  if (await checkUser(ctx, id) == 1) return;
  if (await admin.checkAdmin(id) == false) {
    return ctx.reply(`Этот пользователь не имеет прав администратора`);
  }

  await admin.deleteAdmin(id);
  return ctx.reply(`Вы лишили пользователя ${id} прав администратора`);
};
