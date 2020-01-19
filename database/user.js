const { Model, DataTypes } = require('sequelize');
const database = require('./connect')

class User extends Model { }
User.init({
  idTelegram: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  countReferrals: {
    type: DataTypes.SMALLINT,
    defaultValue: 0
  },
  activeSubscription: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  VIPSubscription: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  freezeSubscription: {
    type: DataTypes.DATE,
    defaultValue: null
  }
}, {
  sequelize: database,
  modelName: 'user'
});

module.exports = User;
