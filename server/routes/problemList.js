const express = require("express");
const router = express.Router()
const {getProblemList , createProblem , updateProblem , deleteProblem}= require("../controllers/problem-controller")

router.get('/',getProblemList);

router.post('/create',createProblem);

router.post('/update',updateProblem);

router.post('/delete',deleteProblem)


module.exports = router

