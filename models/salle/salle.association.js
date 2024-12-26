const Planification = require("../planification/planification.model");
const Salle = require("./salle.model");


Salle.hasMany(Planification);
