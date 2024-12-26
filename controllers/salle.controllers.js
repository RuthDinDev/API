const Salle = require("../models/salle/salle.model");
const Planification = require("../models/planification/planification.model");

async function createSalle(req, res) {
    const { NomSalle, CodeSalle, Capacite, Longitude, Latitude } = req.body;

    if (!NomSalle) {
        return res.status(400).json({ error: "Le nom de la salle est obligatoire." });
    }

    try {
        const existingSalle = await Salle.findOne({ where: { NomSalle } });
        if (existingSalle) {
            return res.status(409).json({ error: "Une salle avec ce nom existe déjà." });
        }

        const newSalle = await Salle.create({ NomSalle, CodeSalle, Capacite, Longitude, Latitude });
        return res.status(201).json(newSalle);
    } catch (error) {
        console.error("Erreur lors de la création de la salle :", error);
        return res.status(500).json({ error: "Impossible de créer la salle." });
    }
}

async function getAllSalles(req, res) {
    try {
        const salles = await Salle.findAll({
            include: [{ model: Planification }]
        });
        return res.status(200).json(salles);
    } catch (error) {
        console.error("Erreur lors de la récupération des salles :", error);
        return res.status(500).json({ error: "Impossible de récupérer les salles." });
    }
}

async function getSalleById(req, res) {
    try {
        const { id } = req.params;
        const salle = await Salle.findByPk(id, {
            include: [Planification]
        });

        if (!salle) {
            return res.status(404).json({ error: "Salle non trouvée." });
        }

        return res.status(200).json(salle);
    } catch (error) {
        console.error("Erreur lors de la récupération de la salle :", error);
        return res.status(500).json({ error: "Impossible de récupérer la salle." });
    }
}

async function updateSalle(req, res) {
    const { id } = req.params;
    const { NomSalle, CodeSalle, Capacite, Longitude, Latitude } = req.body;

    if (!NomSalle) {
        return res.status(400).json({ error: "Le nom de la salle est obligatoire." });
    }

    try {
        const existingSalle = await Salle.findOne({
            where: { NomSalle, idSalle: { [Sequelize.Op.ne]: id } }
        });

        if (existingSalle) {
            return res.status(409).json({ error: "Une salle avec ce nom existe déjà." });
        }

        const [updatedRows] = await Salle.update({ NomSalle, CodeSalle, Capacite, Longitude, Latitude }, {
            where: { idSalle: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Salle non trouvée." });
        }
        const updatedSalle = await Salle.findByPk(id);
        return res.status(200).json(updatedSalle);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la salle :", error);
        return res.status(500).json({ error: "Impossible de mettre à jour la salle." });
    }
}

async function deleteSalle(req, res) {
    const { id } = req.params;

    try {
        const deletedRows = await Salle.destroy({ where: { idSalle: id } });

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Salle non trouvée." });
        }

        return res.status(204).send();
    } catch (error) {
        console.error("Erreur lors de la suppression de la salle :", error);
        return res.status(500).json({ error: "Impossible de supprimer la salle." });
    }
}

module.exports = {
    createSalle,
    getAllSalles,
    getSalleById,
    updateSalle,
    deleteSalle
};