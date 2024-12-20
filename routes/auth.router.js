const express = require('express');
const router = express.Router();

const {registerHandler} = require("../controllers/auth.controller");

router.post("/register",registerHandler);
module.exports = router
