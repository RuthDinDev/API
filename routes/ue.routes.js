const express = require('express');
const router = express.Router();
const UEController = require('../controllers/ue.controllers');


router.post('/ue', UEController.createUE);


router.get('/ue', UEController.getAllUEs);


router.get('/ue/:id', UEController.getUEById);


router.put('/ue/:id', UEController.updateUE);


router.delete('/ue/:id', UEController.deleteUE);

module.exports = router;