// imports
// var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
const Enseignant  = require("../models/enseignant/enseignant.model");
// const { where } = require('sequelize');


    async function createEnseignant(req, res) {
        
        // Récupération des données du corps de la requête
        var Matricule = req.body.Matricule;
        var nom = req.body.NomEnseignant;
        var grade = req.body.Grade;
        // console.log("les ddonnes ",req.body.Matricule);
        // Vérification que tous les champs sont remplis
        if (Matricule == null || nom == null || grade == null) {
            return res.status(400).json({'error': 'tous les champs sont obligatoires'});
        }

        // Vérification si l'enseignant existe déjà (par Matricule)
        Enseignant.findOne({
            attributes: ['Matricule'],
            where: { Matricule: Matricule }
        })
        .then(function(enseignantFound) {
            if (!enseignantFound) {
                // Création d'un nouvel enseignant
                var newEnseignant = Enseignant.create({
                    Matricule: Matricule,
                    NomEnseignant: nom,
                    Grade: grade
                })
                .then(function(newEnseignant) {
                    return res.status(201).json(newEnseignant);
                })
                .catch(function(err) {
                    console.log("l'erreur est ", err);
                    return res.status(500).json({'error': "impossible d'ajouter l'enseignant"});
                });
            } else {
                return res.status(409).json({'error': "un enseignant avec ce Matricule existe déjà"});
            }
        })
        .catch(function(err) {
            return res.status(500).json({'error': 'impossible de vérifier cet enseignant'});
        });
    }

    async function getAllEnseignants(req, res) {
        Enseignant.findAll({
            attributes: ['idEnseignant', 'Matricule', 'NomEnseignant', 'Grade']
        })
        .then(function(enseignants) {
            return res.status(201).json(enseignants);
        })
        .catch(function(err) {
            return res.status(500).json({'error': "Impossible de récupérer les enseignants"});
        });
    }

    async function getEnseignantById(req, res) {
        try {
            const { id } = req.params;
            const enseignant = await Enseignant.findByPk(id);

            if (!enseignant) {
                return res.status(404).json({
                    error: 'Enseignant non trouvé'
                });
            }

            return res.status(200).json(enseignant);

        } catch (error) {
            console.error('Erreur lors de la récupération de l\'enseignant:', error);
            return res.status(500).json({
                error: 'Impossible de récupérer l\'enseignant'
            });
        }
    }

    async function updateEnseignant(req, res) {
        const idEnseignant = req.params.id; // Récupérer l'ID depuis les paramètres de l'URL
        const { Matricule, NomEnseignant, Grade } = req.body; // Destructurer les données de la requête

        try {
            const updatedEnseignant = await Enseignant.update({ Matricule, NomEnseignant, Grade }, {
                where: { idEnseignant: idEnseignant }
            });

            if (updatedEnseignant[0] === 1) { // Vérifier si au moins une ligne a été affectée
                return res.status(200).json({ message: "Enseignant mis à jour avec succès" });
            } else {
                return res.status(404).json({ error: "Enseignant non trouvé" });
            }
        } catch (err) {
            console.error("Erreur lors de la mise à jour de l'enseignant:", err);
            return res.status(500).json({ error: "Impossible de mettre à jour l'enseignant" });
        }
    }

    async function deleteEnseignant(req, res) {
        const idEnseignant = req.params.id;

        try {
            const deletedEnseignant = await Enseignant.destroy({
                where: { idEnseignant: idEnseignant }
            });

            if (deletedEnseignant === 1) {
                return res.status(200).json({ message: "Enseignant supprimé avec succès" });
            } else {
                return res.status(404).json({ error: "Enseignant non trouvé" });
            }
        } catch (err) {
            console.error("Erreur lors de la suppression de l'enseignant:", err);
            return res.status(500).json({ error: "Impossible de supprimer l'enseignant" });
        }
    }


module.exports = {
    createEnseignant,
    getAllEnseignants,
    updateEnseignant,
    deleteEnseignant,
    getEnseignantById
};