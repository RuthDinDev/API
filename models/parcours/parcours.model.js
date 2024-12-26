const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Parcours = sequelize.define('Parcours', {
  idParcours: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  NomParcours: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  CodeParcours: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
}, {
  timestamps: true,  
  tableName: 'Parcours',
});

module.exports = Parcours;
