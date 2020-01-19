const User = require('./user');

exports.findAllUsers = async function(){
  let count, arrayUsers = [];

  await User.findAndCountAll().then(result => {
    count = result.count;
  });

  await User.findAll().then(users => {
    for (i = 0; i < count; i++)
      arrayUsers[i] = users[i].idTelegram;
  });

  return arrayUsers;
};

exports.createUser = async function(id) {
  await User.sync({
    alter: true
  });

  const newUser = await User.create({
    idTelegram: id
  });

  await newUser.save();
};

exports.checkUser = async function(id) {
  let a;
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    if (user == null) a = false;
    else a = true;
  })
  return a;
};

exports.deleteUser = async function(id) {
  User.destroy({
    where: {
      idTelegram: id
    }
  })
};

exports.getBalance = async function(id) {
  let balance;
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    balance = user.get('balance');
  });

  return balance;
};

exports.changeBalance = async function(id, donate) {
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    balance = user.get('balance');
    user.update({ balance: balance + donate })
  });
};

exports.getCountReferrals = async function(id) {
  let countReferrals;
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    countReferrals = user.get('countReferrals');
  });

  return countReferrals;
};

exports.changeCountReferrals = async function(id) {
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    countReferrals = user.get('countReferrals');
    user.update({ countReferrals: countReferrals + 1 })
  });
};

exports.getActiveSubscription = async function(id) {
  let active;
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    active = user.get('activeSubscription');
  });

  return active;
};

exports.setActiveSubscription = async function(id, tf) {
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    user.update({ activeSubscription: tf })
  });
};

exports.getVIPSubscription = async function(id) {
  let subscription;
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    subscription = user.get('VIPSubscription');
  });

  return subscription;
};

exports.setVIPSubscription = async function(id, date) {
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    user.update({ VIPSubscription: date })
  });
};

exports.getFreezeSubscription = async function(id) {
  let freeze;
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    freeze = user.get('freezeSubscription');
  });

  return freeze;
};

exports.setFreezeSubscription = async function(id, date) {
  await User.findOne({ where: {idTelegram: id} }).then(user => {
    user.update({ freezeSubscription: date })
  });
};
