const express = require("express");
const router = express.Router()
const {getProblemList , createProblem , updateProblem}= require("../controllers/problem-controller")

router.get('/',getProblemList);

router.post('/create',createProblem);

router.post('/update',updateProblem);


module.exports = router

