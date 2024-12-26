const Enseignant = require("./enseignant/enseignant.model");
const Parcours = require("./parcours/parcours.model");
const UE = require("./ue/ue.model");
const Dispense = require("./dispense/dispense.model");
const Planification = require("./planification/planification.model");
const AnneeAcademique = require("./annee-academique/annee-academique.model");
const Salle = require("./salle/salle.model");
const Semestre = require("./semestre/semestre.model");
const Utilisateur = require("./utilisateur/utilisateur.model");

// Charger les associations
require("./parcours/parcours.association");
require("./enseignant/enseignant.association");
require("./ue/ue.association");
require("./dispense/dispense.association");
require("./planification/planification.association");
require("./annee-academique/annee-academique.association");
require("./salle/salle.association");
require("./semestre/semestre.association");
require("./utilisateur/utilisateur.association");

// Exporter tous les modèles
module.exports = {
    Enseignant,
    Parcours,
    UE,
    Dispense,
    Planification,
    AnneeAcademique,
    Salle,
    Semestre,
    Utilisateur
};