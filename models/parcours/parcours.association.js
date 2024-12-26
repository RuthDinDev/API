const Planification = require("../planification/planification.model");
const UE = require("../ue/ue.model");
const Parcours = require("./parcours.model");


Parcours.hasMany(UE);
Parcours.hasMany(Planification);