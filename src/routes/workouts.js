// src/routes/workouts.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/workoutsController');

// index
router.get('/', ctrl.index);

// new
router.get('/new', ctrl.newForm);

// create
router.post('/', ctrl.create);

// show
router.get('/:id', ctrl.show);

// edit
router.get('/:id/edit', ctrl.editForm);

// update (method-override required)
router.put('/:id', ctrl.update);

// delete
router.delete('/:id', ctrl.delete);

module.exports = router;
