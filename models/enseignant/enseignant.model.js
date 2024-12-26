const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Enseignant = sequelize.define('Enseignant', {
  idEnseignant: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  Matricule: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  NomEnseignant: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'Enseignant',
});

module.exports = Enseignant;
