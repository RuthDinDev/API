const express = require('express');
const router = express.Router();
const PlanificationController = require('../controllers/planification.controllers');

// Create a new teacher
router.post('/planification', PlanificationController.createPlanification);

// Get all teachers
router.get('/planification', PlanificationController.getAllPlanifications);

// Get teacher by ID
router.get('/planification/:id', PlanificationController.getPlanificationById);

// // Update a teacher
router.put('/planification/:id', PlanificationController.updatePlanification);

// // Delete a teacher
router.delete('/planification/:id', PlanificationController.deletePlanification);

module.exports = router;