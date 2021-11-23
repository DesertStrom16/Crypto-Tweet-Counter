const express = require("express");

const feedController = require("../controllers/counts");

const router = express.Router();

// GET /counts/initial
router.get("/initial", feedController.initial);

// GET /counts/update
router.get("/update", feedController.updateCoinList);

// POST /counts/new_coin
router.post("/new_coin", feedController.newCoin);

// POST /counts/ticker
router.post("/ticker", feedController.ticker);

module.exports = router;