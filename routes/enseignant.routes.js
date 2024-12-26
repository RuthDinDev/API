const express = require('express');
const router = express.Router();
const EnseignantController = require('../controllers/enseignant.controllers');

// Create a new teacher
router.post('/enseignant', EnseignantController.createEnseignant);

// Get all teachers
router.get('/enseignant', EnseignantController.getAllEnseignants);

// Get teacher by ID
router.get('/enseignant/:id', EnseignantController.getEnseignantById);

// // Update a teacher
router.put('/enseignant/:id', EnseignantController.updateEnseignant);

// // Delete a teacher
router.delete('/enseignant/:id', EnseignantController.deleteEnseignant);

module.exports = router;