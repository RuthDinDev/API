const express = require('express');
const router = express.Router();
const SalleController = require('../controllers/salle.controllers');

// Create a new teacher
router.post('/salle', SalleController.createSalle);

// Get all teachers
router.get('/salle', SalleController.getAllSalles);

// Get teacher by ID
router.get('/salle/:id', SalleController.getSalleById);

// // Update a teacher
router.put('/salle/:id', SalleController.updateSalle);

// // Delete a teacher
router.delete('/salle/:id', SalleController.deleteSalle);

module.exports = router;