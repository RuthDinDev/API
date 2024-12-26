const Parcours = require("../models/parcours/parcours.model");
const UE = require("../models/ue/ue.model");
const Planification = require("../models/planification/planification.model");

async function createParcours(req, res) {
    const { NomParcours, CodeParcours } = req.body;

    if (!NomParcours || !CodeParcours) {
        return res.status(400).json({ error: "Le nom et le code du parcours sont obligatoires." });
    }

    try {
        const existingParcoursNom = await Parcours.findOne({ where: { NomParcours } });
        if (existingParcoursNom) {
            return res.status(409).json({ error: "Un parcours avec ce nom existe déjà." });
        }
         const existingParcoursCode = await Parcours.findOne({ where: { CodeParcours } });
        if (existingParcoursCode) {
            return res.status(409).json({ error: "Un parcours avec ce code existe déjà." });
        }

        const newParcours = await Parcours.create({ NomParcours, CodeParcours });
        return res.status(201).json(newParcours);
    } catch (error) {
        console.error("Erreur lors de la création du parcours :", error);
        return res.status(500).json({ error: "Impossible de créer le parcours." });
    }
}

async function getAllParcours(req, res) {
    try {
        const parcours = await Parcours.findAll({
            include: [{ model: UE }, { model: Planification }]
        });
        return res.status(200).json(parcours);
    } catch (error) {
        console.error("Erreur lors de la récupération des parcours :", error);
        return res.status(500).json({ error: "Impossible de récupérer les parcours." });
    }
}

async function getParcoursById(req, res) {
    try {
        const { id } = req.params;
        const parcours = await Parcours.findByPk(id, {
            include: [{ model: UE }, { model: Planification }]
        });

        if (!parcours) {
            return res.status(404).json({ error: "Parcours non trouvé." });
        }

        return res.status(200).json(parcours);
    } catch (error) {
        console.error("Erreur lors de la récupération du parcours :", error);
        return res.status(500).json({ error: "Impossible de récupérer le parcours." });
    }
}

async function updateParcours(req, res) {
    const { id } = req.params;
    const { NomParcours, CodeParcours } = req.body;

    if (!NomParcours || !CodeParcours) {
        return res.status(400).json({ error: "Le nom et le code du parcours sont obligatoires." });
    }

    try {
        const existingParcoursNom = await Parcours.findOne({ where: { NomParcours, idParcours: { [Sequelize.Op.ne]: id } } });
        if (existingParcoursNom) {
            return res.status(409).json({ error: "Un parcours avec ce nom existe déjà." });
        }
         const existingParcoursCode = await Parcours.findOne({ where: { CodeParcours, idParcours: { [Sequelize.Op.ne]: id } } });
        if (existingParcoursCode) {
            return res.status(409).json({ error: "Un parcours avec ce code existe déjà." });
        }
        const [updatedRows] = await Parcours.update({ NomParcours, CodeParcours }, { where: { idParcours: id } });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Parcours non trouvé." });
        }
        const updatedParcours = await Parcours.findByPk(id);
        return res.status(200).json(updatedParcours);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du parcours :", error);
        return res.status(500).json({ error: "Impossible de mettre à jour le parcours." });
    }
}

async function deleteParcours(req, res) {
    const { id } = req.params;

    try {
        const deletedRows = await Parcours.destroy({ where: { idParcours: id } });

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Parcours non trouvé." });
        }

        return res.status(204).send();
    } catch (error) {
        console.error("Erreur lors de la suppression du parcours :", error);
        return res.status(500).json({ error: "Impossible de supprimer le parcours." });
    }
}

module.exports = {
    createParcours,
    getAllParcours,
    getParcoursById,
    updateParcours,
    deleteParcours
};