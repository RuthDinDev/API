const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const AnneeAcademique = sequelize.define('AnneeAcademique', {
  idAnneeAcademique: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  ValueAnneeAcademique: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'AnneeAcademique',
});

module.exports = AnneeAcademique;
