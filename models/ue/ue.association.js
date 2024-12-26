const Dispense = require("../dispense/dispense.model");
const Enseignant = require("../enseignant/enseignant.model");
const Parcours = require("../parcours/parcours.model");
const Semestre = require("../semestre/semestre.model");
const UE = require("./ue.model");


UE.belongsTo(Semestre, {
  foreignKey: "idSemestre"
});

UE.belongsTo(Parcours,{
  foreignKey: "idParcours",
});

// UE.hasMany(Dispense);
UE.belongsToMany(Enseignant,{
  through: Dispense,
  foreignKey: "idUE",
  otherKey: "idEnseignant",
});
