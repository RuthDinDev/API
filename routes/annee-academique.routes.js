const express = require('express');
const router = express.Router();
const AnneeAcademiqueController = require('../controllers/annee-academique.contollers');

// Create a new teacher
router.post('/annee-academique', AnneeAcademiqueController.createAnneeAcademique);

// Get all teachers
router.get('/annee-academique', AnneeAcademiqueController.getAllAnneesAcademiques);

// Get teacher by ID
router.get('/annee-academique/:id', AnneeAcademiqueController.getAnneeAcademiqueById);

// // Update a teacher
router.put('/annee-academique/:id', AnneeAcademiqueController.updateAnneeAcademique);

// // Delete a teacher
router.delete('/annee-academique/:id', AnneeAcademiqueController.deleteAnneeAcademique);

module.exports = router;