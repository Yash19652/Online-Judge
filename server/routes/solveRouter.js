const express = require("express");
const { runSolution, submitSolution } = require("../controllers/solve-controller");
const router = express.Router()


router.post('/run',runSolution);

router.post('/submit',submitSolution);

module.exports = router