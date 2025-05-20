const Response = require('../models/Response');

exports.getScores = async (req, res) => {
  const results = await Response.find();
  res.json(results);
};
