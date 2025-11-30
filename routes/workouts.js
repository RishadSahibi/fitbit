// src/routes/workouts.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/workoutsController");
const { ensureAuthenticated } = require("../middleware/auth");


// VIEW ROUTES
router.get('/', ctrl.index);

// "new" MUST BE BEFORE "/:id"
router.get('/new', ensureAuthenticated, ctrl.newForm);

// CREATE
router.post('/', ensureAuthenticated, ctrl.create);

// SHOW (catch-all dynamic route)
router.get('/:id', ctrl.show);

// EDIT
router.get('/:id/edit', ensureAuthenticated, ctrl.editForm);

// UPDATE
router.put('/:id', ensureAuthenticated, ctrl.update);

// DELETE
router.delete('/:id', ensureAuthenticated, ctrl.delete);


module.exports = router;
