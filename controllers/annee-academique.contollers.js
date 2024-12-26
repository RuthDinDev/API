const AnneeAcademique = require("../models/annee-academique/annee-academique.model");
const Planification = require("../models/planification/planification.model");
const Dispense = require("../models/dispense/dispense.model");

async function createAnneeAcademique(req, res) {
    const { ValueAnneeAcademique } = req.body;

    if (!ValueAnneeAcademique) {
        return res.status(400).json({ error: "L'année académique est obligatoire." });
    }

    try {
        const existingAnneeAcademique = await AnneeAcademique.findOne({
            where: { ValueAnneeAcademique }
        });

        if (existingAnneeAcademique) {
            return res.status(409).json({ error: "Cette année académique existe déjà." });
        }

        const newAnneeAcademique = await AnneeAcademique.create({ ValueAnneeAcademique });
        return res.status(201).json(newAnneeAcademique);
    } catch (error) {
        console.error("Erreur lors de la création de l'année académique :", error);
        return res.status(500).json({ error: "Impossible de créer l'année académique." });
    }
}

async function getAllAnneesAcademiques(req, res) {
    try {
        const anneesAcademiques = await AnneeAcademique.findAll({
            include: [Planification, Dispense]
        });
        return res.status(200).json(anneesAcademiques);
    } catch (error) {
        console.error("Erreur lors de la récupération des années académiques :", error);
        return res.status(500).json({ error: "Impossible de récupérer les années académiques." });
    }
}

async function getAnneeAcademiqueById(req, res) {
    try {
        const { id } = req.params;
        const anneeAcademique = await AnneeAcademique.findByPk(id, {
            include: [Planification, Dispense]
        });

        if (!anneeAcademique) {
            return res.status(404).json({ error: "Année académique non trouvée." });
        }

        return res.status(200).json(anneeAcademique);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'année académique :", error);
        return res.status(500).json({ error: "Impossible de récupérer l'année académique." });
    }
}

async function updateAnneeAcademique(req, res) {
    const { id } = req.params;
    const { ValueAnneeAcademique } = req.body;

    if (!ValueAnneeAcademique) {
        return res.status(400).json({ error: "L'année académique est obligatoire." });
    }

    try {
        const existingAnneeAcademique = await AnneeAcademique.findOne({
            where: { ValueAnneeAcademique, idAnneeAcademique: {[Sequelize.Op.ne]: id} }
        });

        if (existingAnneeAcademique) {
            return res.status(409).json({ error: "Cette année académique existe déjà." });
        }
        const [updatedRows] = await AnneeAcademique.update({ ValueAnneeAcademique }, {
            where: { idAnneeAcademique: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Année académique non trouvée." });
        }
        const updatedAnneeAcademique = await AnneeAcademique.findByPk(id);
        return res.status(200).json(updatedAnneeAcademique);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'année académique :", error);
        return res.status(500).json({ error: "Impossible de mettre à jour l'année académique." });
    }
}

async function deleteAnneeAcademique(req, res) {
    const { id } = req.params;

    try {
        const deletedRows = await AnneeAcademique.destroy({
            where: { idAnneeAcademique: id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Année académique non trouvée." });
        }

        return res.status(204).send();
    } catch (error) {
        console.error("Erreur lors de la suppression de l'année académique :", error);
        return res.status(500).json({ error: "Impossible de supprimer l'année académique." });
    }
}

module.exports = {
    createAnneeAcademique,
    getAllAnneesAcademiques,
    getAnneeAcademiqueById,
    updateAnneeAcademique,
    deleteAnneeAcademique
};