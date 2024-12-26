const Planification = require("../models/planification/planification.model");
const Dispense = require("../models/dispense/dispense.model");
const Parcours = require("../models/parcours/parcours.model");
const Salle = require("../models/salle/salle.model");
const Semestre = require("../models/semestre/semestre.model");
const AnneeAcademique = require("../models/annee-academique/annee-academique.model");
const { Op } = require('sequelize');

async function createPlanification(req, res) {
    const { PlageHoraire, Jours, idDispense, idParcours, idAnneeAcademique, idSemestre, idSalle } = req.body;

    try {
        // Vérif des entités liées
        if (idDispense) {
            const dispense = await Dispense.findByPk(idDispense);
            if (!dispense) {
                return res.status(400).json({ error: "Dispense non trouvé." });
            }
        }
        if (idParcours) {
            const parcours = await Parcours.findByPk(idParcours);
            if (!parcours) {
                return res.status(400).json({ error: "Parcours non trouvé." });
            }
        }
        if (idSemestre) {
            const semestre = await Semestre.findByPk(idSemestre);
            if (!semestre) {
                return res.status(400).json({ error: "Salle non trouvée." });
            }
        }
        if (idSalle) {
            const salle = await Salle.findByPk(idSalle);
            if (!salle) {
                return res.status(400).json({ error: "Salle non trouvée." });
            }
        }
        if (idAnneeAcademique) {
            const anneeAcademique = await AnneeAcademique.findByPk(idAnneeAcademique);
            if (!anneeAcademique) {
                return res.status(400).json({ error: "Année académique non trouvée." });
            }
        }

        // Contrainte 1 : Vérification de chevauchement pour le même dispense
        const overlappingDispense = await Planification.findOne({
            where: { idDispense, Jours, PlageHoraire }
        });
        if (overlappingDispense) {
            return res.status(400).json({ error: "Ce dispense est déjà planifié pour cette plage horaire ce jour." });
        }

        // Contrainte 2 : Vérification pour la salle ou le mm cours au mm moment : pas de meme cours au mm moment
        const overlappingSalle = await Planification.findOne({
            where: {
                Jours,
                PlageHoraire,
                [Op.or]: [{ idSalle }, { idDispense }]
            }
        });
        if (overlappingSalle) {
            return res.status(400).json({ error: "Une autre planification existe déjà dans cette salle ou pour ce cours à ce moment." });
        }

        // Création de la nouvelle planification
        const newPlanification = await Planification.create({ PlageHoraire, Jours, idDispense, idParcours, idAnneeAcademique, idSemestre, idSalle });

        // Vérification des contraintes pour l'enseignant
        const enseignantId = (await Dispense.findByPk(idDispense)).idEnseignant;
        const planificationsEnseignant = await Planification.findAll({
            include: [{ model: Dispense, where: { idEnseignant: enseignantId } }],
            where: { Jours },
            order: [['PlageHoraire', 'ASC']]
        });

        // Liste des plages predefinies
        const plagesHoraires = ["7h30-9h30", "9h30-11h30", "11h30-13h30", "13h30-15h30", "15h30-17h30", "17h30-19h30"];
        // Vérification des 2 planifications successives (CORRIGÉ)
        for (let i = 0; i < planificationsEnseignant.length - 2; i++) {
            const plage1Index = plagesHoraires.indexOf(planificationsEnseignant[i].PlageHoraire);
            const plage2Index = plagesHoraires.indexOf(planificationsEnseignant[i + 1].PlageHoraire);
            const plage3Index = plagesHoraires.indexOf(planificationsEnseignant[i + 2].PlageHoraire);
    
            //Vérification si les 3 plages sont valides (-1 signifie non trouvé)
            if (plage1Index !== -1 && plage2Index !== -1 && plage3Index !== -1) {
                if (plage2Index === plage1Index + 1 && plage3Index === plage2Index + 1) {
                    await Planification.destroy({ where: { idPlanification: newPlanification.idPlanification } });
                    return res.status(400).json({ error: "L'enseignant ne peut pas avoir 3 planifications successives ce jour." });
                }
            }
        }
        return res.status(201).json(newPlanification);
    } catch (error) {
        console.error("Erreur lors de la création de la planification :", error);
        return res.status(500).json({ error: "Impossible de créer la planification." });
    }
}


async function updatePlanification(req, res) {
    const { id } = req.params;
    const { HeuresDebut, HeureFin, Jours, idDispense, idParcours, idAnneeAcademique, idSalle } = req.body;

    try {
          const planificationExists = await Planification.findByPk(id);
        if(!planificationExists){
             return res.status(404).json({ error: "Planification non trouvée." });
        }
        // ... (Vérification de l'existence des entités liées)
        const overlappingDispense = await Planification.findOne({
            where: {
                idDispense,
                Jours,
                idPlanification: {[Op.ne]: id},
                 [Op.or]: [
                    { HeuresDebut: { [Op.lt]: HeureFin }, HeureFin: { [Op.gt]: HeuresDebut } },
                     {HeuresDebut: HeuresDebut, HeureFin: HeureFin}
                ]
            }
        });
        if (overlappingDispense) {
            return res.status(400).json({ error: "Ce dispense est déjà planifié à cette heure ce jour." });
        }

        const overlappingSalle = await Planification.findOne({
            where: {
                Jours,
                 idPlanification: {[Op.ne]: id},
                [Op.or]: [
                    { HeuresDebut: { [Op.lt]: HeureFin }, HeureFin: { [Op.gt]: HeuresDebut } },
                     {HeuresDebut: HeuresDebut, HeureFin: HeureFin}
                ],
                [Op.or]: [{idSalle: idSalle}, {idDispense: idDispense}]
            },
        });
        if (overlappingSalle) {
            return res.status(400).json({ error: "Une autre planification existe déjà dans cette salle à ce moment ou le cours est deja planifié." });
        }

        const [updatedRows] = await Planification.update({ HeuresDebut, HeureFin, Jours, idDispense, idParcours, idAnneeAcademique, idSalle }, {
            where: { idPlanification: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Planification non trouvée." });
        }
        const updatedPlanification = await Planification.findByPk(id);
        return res.status(200).json(updatedPlanification);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la planification :", error);
        return res.status(500).json({ error: "Impossible de mettre à jour la planification." });
    }
}
async function getAllPlanifications(req, res) {
    try {
        const planifications = await Planification.findAll({
            include: [Dispense, Parcours, Salle, AnneeAcademique]
        });
        return res.status(200).json(planifications);
    } catch (error) {
        console.error("Erreur lors de la récupération des planifications :", error);
        return res.status(500).json({ error: "Impossible de récupérer les planifications." });
    }
}

async function getPlanificationById(req, res) {
    try {
        const { id } = req.params;
        const planification = await Planification.findByPk(id, {
            include: [Dispense, Parcours, Salle, AnneeAcademique]
        });

        if (!planification) {
            return res.status(404).json({ error: "Planification non trouvée." });
        }

        return res.status(200).json(planification);
    } catch (error) {
        console.error("Erreur lors de la récupération de la planification :", error);
        return res.status(500).json({ error: "Impossible de récupérer la planification." });
    }
}

async function updatePlanification(req, res) {
    const { id } = req.params;
    const { HeuresDebut, HeureFin, Jours, idDispense, idParcours, idAnneeAcademique, idSalle } = req.body;

    try {
        const planificationExists = await Planification.findByPk(id);
        if (!planificationExists) {
            return res.status(404).json({ error: "Planification non trouvée." });
        }

        // Vérification de l'existence des entités liées
        if (idDispense) {
            const dispense = await Dispense.findByPk(idDispense);
            if (!dispense) {
                return res.status(400).json({ error: "Dispense non trouvée." });
            }
        }
        if (idParcours) {
            const parcours = await Parcours.findByPk(idParcours);
            if (!parcours) {
                return res.status(400).json({ error: "Parcours non trouvé." });
            }
        }
        if (idSalle) {
            const salle = await Salle.findByPk(idSalle);
            if (!salle) {
                return res.status(400).json({ error: "Salle non trouvée." });
            }
        }
        if (idAnneeAcademique) {
            const anneeAcademique = await AnneeAcademique.findByPk(idAnneeAcademique);
            if (!anneeAcademique) {
                return res.status(400).json({ error: "Année Académique non trouvée." });
            }
        }

        // Contrainte 1 : Un même dispense ne peut pas être programmé à la même heure le même jour
        const overlappingDispense = await Planification.findOne({
            where: {
                idDispense,
                Jours,
                idPlanification: { [Op.ne]: id }, // Exclure la planification actuelle de la vérification
                [Op.or]: [
                    { HeuresDebut: { [Op.lt]: HeureFin }, HeureFin: { [Op.gt]: HeuresDebut } },
                    {HeuresDebut: HeuresDebut, HeureFin: HeureFin}
                ]
            }
        });
        if (overlappingDispense) {
            return res.status(400).json({ error: "Ce dispense est déjà planifié à cette heure ce jour." });
        }

        // Contrainte 3 et 4 (fusionnées) :
        const overlappingSalle = await Planification.findOne({
            where: {
                Jours,
                idPlanification: { [Op.ne]: id }, // Exclure la planification actuelle de la vérification
                [Op.or]: [
                    { HeuresDebut: { [Op.lt]: HeureFin }, HeureFin: { [Op.gt]: HeuresDebut } },
                    {HeuresDebut: HeuresDebut, HeureFin: HeureFin}
                ],
                [Op.or]: [{idSalle: idSalle}, {idDispense: idDispense}]
            },
        });
        if (overlappingSalle) {
            return res.status(400).json({ error: "Une autre planification existe déjà dans cette salle à ce moment ou le cours est deja planifié." });
        }

        const [updatedRows] = await Planification.update({ HeuresDebut, HeureFin, Jours, idDispense, idParcours, idAnneeAcademique, idSalle }, {
            where: { idPlanification: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Planification non trouvée." });
        }

        const updatedPlanification = await Planification.findByPk(id);
        
        const enseignantId = (await Dispense.findByPk(idDispense)).idEnseignant;
        const planificationsEnseignant = await Planification.findAll({
            include: [{model: Dispense, where: {idEnseignant: enseignantId}}],
            where: {Jours: Jours},
            order: [['HeuresDebut', 'ASC']]
        });

        for (let i = 0; i < planificationsEnseignant.length - 2; i++) {
            const plage1Fin = new Date(planificationsEnseignant[i].HeureFin);
            const plage2Debut = new Date(planificationsEnseignant[i+1].HeuresDebut);
            const plage3Debut = new Date(planificationsEnseignant[i+2].HeuresDebut);
            const difference1 = (plage2Debut.getTime() - plage1Fin.getTime())/ (1000 * 60 * 60);
            const difference2 = (plage3Debut.getTime() - plage2Debut.getTime())/ (1000 * 60 * 60);

            if (difference1 <= 2 && difference2 <= 2) { 
                return res.status(400).json({ error: "L'enseignant ne peut pas avoir 3 planifications successives ce jour." });
            }
        }
        return res.status(200).json(updatedPlanification);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la planification :", error);
        return res.status(500).json({ error: "Impossible de mettre à jour la planification." });
    }
}

async function deletePlanification(req, res) {
    const { id } = req.params;

    try {
        const deletedRows = await Planification.destroy({
            where: { idPlanification: id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Planification non trouvée." });
        }

        return res.status(204).send();
    } catch (error) {
        console.error("Erreur lors de la suppression de la planification :", error);
        return res.status(500).json({ error: "Impossible de supprimer la planification." });
    }
}

module.exports = {
    createPlanification,
    getAllPlanifications,
    getPlanificationById,
    updatePlanification,
    deletePlanification
};