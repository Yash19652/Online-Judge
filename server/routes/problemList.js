const express = require("express");
const router = express.Router()
const {getProblemList , createProblem}= require("../controllers/problem-controller")

router.get('/',getProblemList);

router.post('/create',createProblem);


module.exports = router

