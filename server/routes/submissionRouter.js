const express = require("express");
const router = express.Router()
const {getSubmissions} = require("../controllers/submission-controller")

router.post('/',getSubmissions);

module.exports = router