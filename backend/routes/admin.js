const router = require("express").Router();
const { getScores } = require("../controllers/adminController");

router.get("/scores", getScores);

module.exports = router;
