const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const UE = sequelize.define('UE', {
  idUE: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  CodeUE: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  NomUE: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CreditUE: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  VolumeHoraire: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
 DebitHoraire: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,  
  tableName: 'UE'  
});

module.exports = UE;
