const { Model, DataTypes } = require('sequelize');
const database = require('./connect');

class Admin extends Model { }
Admin.init({
  idTelegram: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  superUser: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize: database,
  modelName: 'admin'
});

module.exports = Admin;
