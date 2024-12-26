const Dispense = require("../dispense/dispense.model");
const Planification = require("../planification/planification.model");
const AnneeAcademique = require("./annee-academique.model");


AnneeAcademique.hasMany(Planification);
AnneeAcademique.hasMany(Dispense);