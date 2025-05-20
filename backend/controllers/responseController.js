const Response = require("../models/Response");
const Question = require("../models/Question");

exports.submit = async (req, res) => {
  const { userId, answers } = req.body;
  if (await Response.findOne({ userId })) {
    return res.status(400).json({ message: "Already submitted" });
  }
  const questions = await Question.find();
  let score = 0;
  answers.forEach((a) => {
    const q = questions.find((q) => q.id === a.questionId);
    if (q && q.correctAnswer === a.selected) score++;
  });
  const resp = await Response.create({ userId, answers, score });
  res.json({ score });
};

exports.check = async (req, res) => {
  const { userId } = req.params;
  const existing = await Response.findOne({ userId });
  if (existing) {
    return res.json({ submitted: true, score: existing.score });
  }
  res.json({ submitted: false });
};
