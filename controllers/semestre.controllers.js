const Semestre = require("../models/semestre/semestre.model");
const UE = require("../models/ue/ue.model"); // Import du modèle UE
const Planification = require("../models/planification/planification.model"); // Import du modèle Planification

async function createSemestre(req, res) {
    const { NumeroSemestre } = req.body;

    if (!NumeroSemestre) {
        return res.status(400).json({ error: "Le numéro de semestre est obligatoire." });
    }

    try {
        const existingSemestre = await Semestre.findOne({ where: { NumeroSemestre } });
        if (existingSemestre) {
            return res.status(409).json({ error: "Un semestre avec ce numéro existe déjà." });
        }

        const newSemestre = await Semestre.create({ NumeroSemestre });
        return res.status(201).json(newSemestre);
    } catch (error) {
        console.error("Erreur lors de la création du semestre :", error);
        return res.status(500).json({ error: "Impossible de créer le semestre." });
    }
}

async function getAllSemestres(req, res) {
    try {
        const semestres = await Semestre.findAll({
            include: [{ model: UE }, { model: Planification }] // Inclure les UEs et les Planifications
        });
        return res.status(200).json(semestres);
    } catch (error) {
        console.error("Erreur lors de la récupération des semestres :", error);
        return res.status(500).json({ error: "Impossible de récupérer les semestres." });
    }
}

async function getSemestreById(req, res) {
    try {
        const { id } = req.params;
        const semestre = await Semestre.findByPk(id, {
            include: [{ model: UE }, { model: Planification }] // Inclure les UEs et les Planifications
        });

        if (!semestre) {
            return res.status(404).json({ error: "Semestre non trouvé." });
        }

        return res.status(200).json(semestre);
    } catch (error) {
        console.error("Erreur lors de la récupération du semestre :", error);
        return res.status(500).json({ error: "Impossible de récupérer le semestre." });
    }
}

async function updateSemestre(req, res) {
    const { id } = req.params;
    const { NumeroSemestre } = req.body;

    if (!NumeroSemestre) {
        return res.status(400).json({ error: "Le numéro de semestre est obligatoire." });
    }

    try {
        const [updatedRows] = await Semestre.update({ NumeroSemestre }, { where: { idSemestre: id } });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Semestre non trouvé." });
        }

        const updatedSemestre = await Semestre.findByPk(id); // Récupérer le semestre mis à jour pour le renvoyer
        return res.status(200).json(updatedSemestre);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du semestre :", error);
        return res.status(500).json({ error: "Impossible de mettre à jour le semestre." });
    }
}

async function deleteSemestre(req, res) {
    const { id } = req.params;

    try {
        const deletedRows = await Semestre.destroy({ where: { idSemestre: id } });

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Semestre non trouvé." });
        }

        return res.status(204).send(); // 204 No Content pour une suppression réussie
    } catch (error) {
        console.error("Erreur lors de la suppression du semestre :", error);
        return res.status(500).json({ error: "Impossible de supprimer le semestre." });
    }
}

module.exports = {
    createSemestre,
    getAllSemestres,
    getSemestreById,
    updateSemestre,
    deleteSemestre
};