const router = require("express").Router();
const { submit, check } = require("../controllers/responseController");

router.post("/", submit);
router.get("/:userId", check);

module.exports = router;
