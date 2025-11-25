const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true, min: 1 },
  reps: { type: Number, required: true, min: 1 },
  weight: { type: Number, default: 0 }
});

const WorkoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  exercises: [ExerciseSchema],
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
