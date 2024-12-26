const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Salle = sequelize.define('Salle', {
  idSalle: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  NomSalle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  CodeSalle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Capacite: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Longitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Latitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  timestamps: true,  
  tableName: 'Salle'  
});

module.exports = Salle;
