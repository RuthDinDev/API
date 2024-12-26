const sequelize = require('./config/database'); 
const express = require('express');
const dotenv = require("dotenv").config();
const app = express();

// imports des routes
const enseignantRoutes = require("./routes/enseignant.routes");
const ueRoutes = require('./routes/ue.routes');
const semestreRoutes = require('./routes/semestre.routes');
const parcoursRoutes = require('./routes/parcours.routes');
const dispenseRoutes = require('./routes/dispense.routes');
const annee_accademiqueRoutes = require('./routes/annee-academique.routes');
const salle = require('./routes/salle.routes');
const planification = require('./routes/planification.routes');
// const apiRoutr = require("./routes/index.routes");

require("./models/index");

const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Appel des routes
app.use('/api/', enseignantRoutes);
app.use('/api/',ueRoutes);
app.use('/api/',semestreRoutes);
app.use('/api/',parcoursRoutes);
app.use('/api/',dispenseRoutes);
app.use('/api/',annee_accademiqueRoutes);
app.use('/api/',salle);
app.use('/api/',planification);



// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Synchronisation de la base de données
sequelize
  .sync({ alter: true }) 
  .then(() => {
    console.log( 'La base de données a été synchronisée avec succès.');
  })
  .catch((error) => { 
    console.error('Erreur lors de la synchronisation de la base de données :', error);
  });

// Configuration du serveur
const PORT = process.env.PORT || 4008;
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Welcome to the Express server</h1>');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`                     ____________________________
                    | Api en cour d'execution.  |
                    | Port : ${PORT}.              |
                    |___________________________|
    `);
});
