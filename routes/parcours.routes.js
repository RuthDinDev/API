const express = require('express');
const router = express.Router();
const ParcoursController = require('../controllers/parcours.controllers');

// Create a new teacher
router.post('/parcours', ParcoursController.createParcours);

// Get all teachers
router.get('/parcours', ParcoursController.getAllParcours);

// Get teacher by ID
router.get('/parcours/:id', ParcoursController.getParcoursById);

// // Update a teacher
router.put('/parcours/:id', ParcoursController.updateParcours);

// // Delete a teacher
router.delete('/parcours/:id', ParcoursController.deleteParcours);

module.exports = router;