const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Planification = sequelize.define('Planification', {
  idPlanification: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  PlageHoraire: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // HeuresDebut: {
  //   type: DataTypes.DATE,
  //   allowNull: true
  // },
  // HeureFin: {
  //   type: DataTypes.DATE,
  //   allowNull: true
  // },
  Jours: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idDispense: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idParcours: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idAnneeAcademique: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idSemestre: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idSalle: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,  
  tableName: 'Planification'  
});

module.exports = Planification;
