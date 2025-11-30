// src/controllers/workoutsController.js
const Workout = require('../models/workout');

// show all workouts
exports.index = async (req, res) => {
  const workouts = await Workout.find().sort({ date: -1 });
  res.render('workouts/index', { workouts });
};

// show form
exports.newForm = (req, res) => res.render('workouts/new');

// create
exports.create = async (req, res) => {
  // parse exercises from form; assume multiple exercises with indexes
  const { title, date, notes } = req.body;
  let exercises = [];

  if (req.body['ex-name']) {
    // support single or array
    const names = Array.isArray(req.body['ex-name']) ? req.body['ex-name'] : [req.body['ex-name']];
    const sets = Array.isArray(req.body['ex-sets']) ? req.body['ex-sets'] : [req.body['ex-sets']];
    const reps = Array.isArray(req.body['ex-reps']) ? req.body['ex-reps'] : [req.body['ex-reps']];
    const weight = Array.isArray(req.body['ex-weight']) ? req.body['ex-weight'] : [req.body['ex-weight']];

    names.forEach((n, i) => {
      if (n && n.trim() !== '') {
        exercises.push({
          name: n,
          sets: parseInt(sets[i]) || 0,
          reps: parseInt(reps[i]) || 0,
          weight: parseFloat(weight[i]) || 0
        });
      }
    });
  }

  try {
    const workout = new Workout({ title, date, exercises, notes });
    await workout.save();
    res.redirect('/workouts');
  } catch (err) {
    console.error(err);
    res.render('workouts/new', { error: 'Failed to create workout', workout: req.body });
  }
};

// show single
exports.show = async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).render('404');
  res.render('workouts/show', { workout });
};

// edit form
exports.editForm = async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).render('404');
  res.render('workouts/edit', { workout });
};

// update
exports.update = async (req, res) => {
  const { title, date, notes } = req.body;
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).render('404');

  // rebuild exercises (similar to create)
  let exercises = [];
  if (req.body['ex-name']) {
    const names = Array.isArray(req.body['ex-name']) ? req.body['ex-name'] : [req.body['ex-name']];
    const sets = Array.isArray(req.body['ex-sets']) ? req.body['ex-sets'] : [req.body['ex-sets']];
    const reps = Array.isArray(req.body['ex-reps']) ? req.body['ex-reps'] : [req.body['ex-reps']];
    const weight = Array.isArray(req.body['ex-weight']) ? req.body['ex-weight'] : [req.body['ex-weight']];
    names.forEach((n, i) => {
      if (n && n.trim() !== '') {
        exercises.push({
          name: n,
          sets: parseInt(sets[i]) || 0,
          reps: parseInt(reps[i]) || 0,
          weight: parseFloat(weight[i]) || 0
        });
      }
    });
  }

  workout.title = title;
  workout.date = date || workout.date;
  workout.exercises = exercises;
  workout.notes = notes;

  try {
    await workout.save();
    res.redirect(`/workouts/${workout._id}`);
  } catch (err) {
    console.error(err);
    res.render('workouts/edit', { error: 'Failed to update', workout });
  }
};

// delete
exports.delete = async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect('/workouts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Delete failed');
  }
};
