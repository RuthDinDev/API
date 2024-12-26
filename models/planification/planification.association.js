const AnneeAcademique = require("../annee-academique/annee-academique.model");
const Dispense = require("../dispense/dispense.model");
const Parcours = require("../parcours/parcours.model");
const Salle = require("../salle/salle.model");
const Planification = require("./planification.model");


Planification.belongsTo(Dispense,{
  foreignKey: "idDispense",
});

Planification.belongsTo(Parcours,{
  foreignKey: "idParcours",
});

Planification.belongsTo(Salle,{
  foreignKey: "idSalle",
});

Planification.belongsTo(AnneeAcademique,{
  foreignKey: "idAnneeAcademique",
});