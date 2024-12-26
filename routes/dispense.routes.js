const express = require('express');
const router = express.Router();
const DispenseController = require('../controllers/dispense.controllers');

// Create a new teacher
router.post('/dispense', DispenseController.createDispense);

// Get all teachers
router.get('/dispense', DispenseController.getAllDispenses);

// Get teacher by ID
router.get('/dispense/:id', DispenseController.getDispenseById);

// // Update a teacher
router.put('/dispense/:id', DispenseController.updateDispense);

// // Delete a teacher
router.delete('/dispense/:id', DispenseController.deleteDispense);

module.exports = router;