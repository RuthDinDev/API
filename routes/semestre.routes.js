const express = require('express');
const router = express.Router();
const SemestreController = require('../controllers/semestre.controllers');

// Create a new teacher
router.post('/semestre', SemestreController.createSemestre);

// Get all teachers
router.get('/semestre', SemestreController.getAllSemestres);

// Get teacher by ID
router.get('/semestre/:id', SemestreController.getSemestreById);

// // Update a teacher
router.put('/semestre/:id', SemestreController.updateSemestre);

// // Delete a teacher
router.delete('/semestre/:id', SemestreController.deleteSemestre);

module.exports = router;