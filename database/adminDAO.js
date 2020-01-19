const Admin = require('./admin');

exports.createAdmin = async function (id) {
  await Admin.sync({
    alter: true
  });

  const newAdmin = await Admin.create({
    idTelegram: id
  });

  await newAdmin.save();
};

exports.checkAdmin = async function (id) {
  let a;
  await Admin.findOne({ where: { idTelegram: id } }).then(admin => {
    if (admin == null) a = false;
    else a = true;
  })
  return a;
};

exports.deleteAdmin = async function (id) {
  Admin.destroy({
    where: {
      idTelegram: id
    }
  })
};

exports.checkSuperUser = async function (id) {
  let a;
  await Admin.findOne({ where: { idTelegram: id } }).then(admin => {
    if (admin.superUser == false) a = false;
    else a = true;
  })
  return a;
};
