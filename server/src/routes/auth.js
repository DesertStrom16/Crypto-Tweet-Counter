const express = require("express");

const feedController = require("../controllers/auth");

const router = express.Router();

// POST /auth/signup
router.post("/signup", feedController.signup);

// POST /auth/login
router.post("/login", feedController.login);

module.exports = router;