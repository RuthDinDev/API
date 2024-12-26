const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Semestre = sequelize.define('Semestre', {
  idSemestre: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  NumeroSemestre: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true,  
  tableName: 'Semestre'  
});

module.exports = Semestre;
