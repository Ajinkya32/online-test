const Question = require('../models/Question');

exports.getAll = async (req, res) => {
  const questions = await Question.find().select('-correctAnswer');
  res.json(questions);
};
