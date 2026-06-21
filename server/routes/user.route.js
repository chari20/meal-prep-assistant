const express = require("express");
const { saveUserInformation } = require('../controllers/user.controller')

const router = express.Router();

router.post("/api/user", saveUserInformation);

module.exports = router;