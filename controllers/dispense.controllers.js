const Dispense = require("../models/dispense/dispense.model");
const Enseignant = require("../models/enseignant/enseignant.model");
const UE = require("../models/ue/ue.model");
const Planification = require("../models/planification/planification.model");
const { AnneeAcademique } = require("../models");

async function createDispense(req, res) {
    const { idEnseignant, idUE, idAnneeAcademique, isPrincipal, isPublish } = req.body;

    if (!idEnseignant || !idUE || !idAnneeAcademique || isPrincipal === undefined || isPublish === undefined) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    try {
        const enseignant = await Enseignant.findByPk(idEnseignant);
        if (!enseignant) {
            return res.status(400).json({ error: "Enseignant non trouvé." });
        }

        const ue = await UE.findByPk(idUE);
        if (!ue) {
            return res.status(400).json({ error: "UE non trouvée." });
        }
        const annee = await AnneeAcademique.findByPk(idAnneeAcademique);
        if (!annee) {
            return res.status(400).json({ error: "AnneeAcademique non trouvée." });
        }
        const existingPrincipal = await Dispense.findOne({
            where: {
                idUE: idUE,
                idAnneeAcademique: idAnneeAcademique,
                isPrincipal: true
            }
        });
        // if (isPrincipal && existingPrincipal) {
        //     return res.status(409).json({ error: "Un enseignant principal existe déjà pour cette UE et cette année." });
        // }

        const existingDispense = await Dispense.findOne({
            where: { idEnseignant, idUE, idAnneeAcademique, isPrincipal }
        });

        if (existingDispense) {
            return res.status(409).json({ error: "Une dispense avec ces paramètres existe déjà." });
        }

        const newDispense = await Dispense.create({ idEnseignant, idUE, idAnneeAcademique, isPrincipal, isPublish });
        return res.status(201).json(newDispense);
    } catch (error) {
        console.error("Erreur lors de la création de la dispense :", error);
        return res.status(500).json({ error: "Impossible de créer la dispense." });
    }
}

async function getAllDispenses(req, res) {
    try {
        const dispenses = await Dispense.findAll({
            include: [Enseignant, UE, Planification] // Inclure Enseignant, UE et Planification
        });
        return res.status(200).json(dispenses);
    } catch (error) {
        console.error("Erreur lors de la récupération des dispenses :", error);
        return res.status(500).json({ error: "Impossible de récupérer les dispenses." });
    }
}

async function getDispenseById(req, res) {
    try {
        const { id } = req.params;
        const dispense = await Dispense.findByPk(id, {
            include: [Enseignant, UE, Planification]
        });

        if (!dispense) {
            return res.status(404).json({ error: "Dispense non trouvée." });
        }

        return res.status(200).json(dispense);
    } catch (error) {
        console.error("Erreur lors de la récupération de la dispense :", error);
        return res.status(500).json({ error: "Impossible de récupérer la dispense." });
    }
}

async function updateDispense(req, res) {
    const { id } = req.params;
    const { idEnseignant, idUE, idAnneeAcademique, isPrincipal, isPublish } = req.body;

    if (!idEnseignant || !idUE || !idAnneeAcademique || isPrincipal === undefined || isPublish === undefined) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    try {
        const dispenseExists = await Dispense.findByPk(id);
        if(!dispenseExists){
             return res.status(404).json({ error: "Dispense non trouvée." });
        }
        const enseignant = await Enseignant.findByPk(idEnseignant);
        if (!enseignant) {
            return res.status(400).json({ error: "Enseignant non trouvé." });
        }

        const ue = await UE.findByPk(idUE);
        if (!ue) {
            return res.status(400).json({ error: "UE non trouvée." });
        }
        const existingDispense = await Dispense.findOne({
            where: { idEnseignant, idUE, idAnneeAcademique, idDispense: {[Sequelize.Op.ne]: id} }
        });

        if (existingDispense) {
            return res.status(409).json({ error: "Une dispense avec ces paramètres existe déjà." });
        }
        const [updatedRows] = await Dispense.update({ idEnseignant, idUE, idAnneeAcademique, isPrincipal, isPublish }, { where: { idDispense: id } });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Dispense non trouvée." });
        }
        const updatedDispense = await Dispense.findByPk(id);
        return res.status(200).json(updatedDispense);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la dispense :", error);
        return res.status(500).json({ error: "Impossible de mettre à jour la dispense." });
    }
}

async function deleteDispense(req, res) {
    const { id } = req.params;

    try {
        const deletedRows = await Dispense.destroy({ where: { idDispense: id } });

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Dispense non trouvée." });
        }

        return res.status(204).send();
    } catch (error) {
        console.error("Erreur lors de la suppression de la dispense :", error);
        return res.status(500).json({ error: "Impossible de supprimer la dispense." });
    }
}

module.exports = {
    createDispense,
    getAllDispenses,
    getDispenseById,
    updateDispense,
    deleteDispense
};