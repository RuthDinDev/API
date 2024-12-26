// imports
const UE = require("../models/ue/ue.model");
const Semestre = require("../models/semestre/semestre.model"); 
const Parcours = require("../models/parcours/parcours.model"); 
const Dispense = require("../models/dispense/dispense.model");
const Enseignant = require("../models/enseignant/enseignant.model");

async function createUE(req, res) {
    const { CodeUE, NomUE, CreditUE, VolumeHoraire, idSemestre, idParcours, DebitHoraire } = req.body; 

    if (!CodeUE || !NomUE || !CreditUE || !VolumeHoraire || !idSemestre || !idParcours || !DebitHoraire) { 
        return res.status(400).json({ 'error': 'Tous les champs sont obligatoires, y compris idSemestre et idParcours' });
    }

    try {
        const ueFound = await UE.findOne({ where: { CodeUE } });
        if (ueFound) {
            return res.status(409).json({ 'error': "Une UE avec ce Code existe déjà" });
        }
        const semestreExists = await Semestre.findByPk(idSemestre);
        if(!semestreExists){
            return res.status(400).json({'error': "Ce semestre n'existe pas"});
        }
        const parcoursExists = await Parcours.findByPk(idParcours);
        if(!parcoursExists){
            return res.status(400).json({'error': "Ce parcours n'existe pas"});
        }
        // const DebitHoraire = VolumeHoraire;
        const newUE = await UE.create({
            CodeUE, NomUE, CreditUE, VolumeHoraire, idSemestre, idParcours, DebitHoraire
        });

        return res.status(201).json(newUE);
    } catch (err) {
        console.error("Erreur lors de la création de l'UE :", err);
        return res.status(500).json({ 'error': "Impossible d'ajouter l'UE" });
    }
}

async function getAllUEs(req, res) {
    try {
        const ues = await UE.findAll({
            attributes: ['idUE', 'CodeUE', 'NomUE', 'CreditUE', 'VolumeHoraire','DebitHoraire', 'idSemestre', 'idParcours'],
            include: [{ model: Semestre }, {model: Parcours}, {model: Enseignant, through: {attributes: []}}]
        });
        return res.status(200).json(ues);
    } catch (err) {
        console.error("Erreur lors de la récupération des UEs :", err);
        return res.status(500).json({ 'error': "Impossible de récupérer les UEs" });
    }
}

async function getUEById(req, res) {
    try {
        const { id } = req.params;
        const ue = await UE.findByPk(id, {
            include: [{ model: Semestre }, {model: Parcours}, {model: Enseignant, through: {attributes: []}}]
        });

        if (!ue) {
            return res.status(404).json({ error: 'UE non trouvée' });
        }

        return res.status(200).json(ue);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'UE:', error);
        return res.status(500).json({ error: 'Impossible de récupérer l\'UE' });
    }
}

async function updateUE(req, res) {
    const idUE = req.params.id;
    const { CodeUE, NomUE, CreditUE, VolumeHoraire, idSemestre, idParcours, DebitHoraire } = req.body;

    try {
        const ueExists = await UE.findByPk(idUE);
        if(!ueExists){
            return res.status(404).json({ error: "UE non trouvée" });
        }
        const semestreExists = await Semestre.findByPk(idSemestre);
        if(!semestreExists){
            return res.status(400).json({'error': "Ce semestre n'existe pas"});
        }
        const parcoursExists = await Parcours.findByPk(idParcours);
        if(!parcoursExists){
            return res.status(400).json({'error': "Ce parcours n'existe pas"});
        }
        const updatedUE = await UE.update({ CodeUE, NomUE, CreditUE, VolumeHoraire, idSemestre, idParcours , DebitHoraire}, {
            where: { idUE: idUE }
        });

        if (updatedUE[0] === 1) {
            return res.status(200).json({ message: "UE mise à jour avec succès" });
        } else {
            return res.status(404).json({ error: "UE non trouvée" });
        }
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'UE:", err);
        return res.status(500).json({ error: "Impossible de mettre à jour l'UE" });
    }
}

async function deleteUE(req, res) {
    const idUE = req.params.id;

    try {
        const deletedUE = await UE.destroy({
            where: { idUE: idUE }
        });

        if (deletedUE === 1) {
            return res.status(200).json({ message: "UE supprimée avec succès" });
        } else {
            return res.status(404).json({ error: "UE non trouvée" });
        }
    } catch (err) {
        console.error("Erreur lors de la suppression de l'UE:", err);
        return res.status(500).json({ error: "Impossible de supprimer l'UE" });
    }
}

module.exports = {
    createUE,
    getAllUEs,
    getUEById,
    updateUE,
    deleteUE
};