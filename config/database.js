const { Sequelize } = require('sequelize'); // Importation de Sequelize
require("dotenv").config();

// Création de l'instance Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
