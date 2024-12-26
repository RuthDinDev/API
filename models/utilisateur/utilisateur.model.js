const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Utilisateur = sequelize.define('Utilisateur', {
  idUtilisateur: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  NomUtilisateur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Matricule: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  RoleUtilisateur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,  
  tableName: 'Utilisateur'
});

module.exports = Utilisateur;
