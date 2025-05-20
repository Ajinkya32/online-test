const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  answers: [{ questionId: String, selected: Number }],
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', ResponseSchema);
