const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Dispense = sequelize.define('Dispense', {
  idDispense: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  
  idEnseignant: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idUE: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idAnneeAcademique: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isPrincipal: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  isPublish: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
}, {
  timestamps: true,
  tableName: 'Dispense'
});

module.exports = Dispense;
