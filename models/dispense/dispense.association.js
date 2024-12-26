const Enseignant = require("../enseignant/enseignant.model");
const Planification = require("../planification/planification.model");
const UE = require("../ue/ue.model");
const Dispense = require("./dispense.model");

Dispense.belongsTo(Enseignant, {
  foreignKey:"idEnseignant",
})

Dispense.belongsTo(UE, {
  foreignKey:"idUE",
});

Dispense.hasMany(Planification);