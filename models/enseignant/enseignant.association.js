const Dispense = require("../dispense/dispense.model");
const UE = require("../ue/ue.model");
const Enseignant = require("./enseignant.model")


// Enseignant.hasMany(Dispense);
Enseignant.belongsToMany(UE,{
  through:Dispense,
  foreignKey: "idEnseignant",
  otherKey: "idUE",
})