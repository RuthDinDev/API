const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const developmentPort = process.env.PORT;

const developmentLink = ["http://localhost:3000", "http://localhost:3001"];
const allLink = "*";
// Initialisation de l'application Express
const app = express();

app.use(
  cors({
    origin: developmentLink,
    credentials: true,
  })
);

// Ports
const port = process.env.PORT || 4000;

// Intégration des routes
require("./server");
require("./routes/index.routes")(app);

// Initialisation de la base de données
const { sequelize } = require("./config/database");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie.");
    return sequelize.sync({ force: true }); // Synchro les modèles
  })
  .then(() => {
    console.log("Base de données synchronisée.");
  })
  .catch((error) => {
    console.error("Échec de la connexion à la base de données :", error);
    process.exit(1); 
  });

