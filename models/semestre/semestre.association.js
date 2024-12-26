const Planification = require("../planification/planification.model");
const UE = require("../ue/ue.model");
const Semestre = require("./semestre.model");

Semestre.hasMany(UE);
Semestre.hasMany(Planification);