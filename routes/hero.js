const express = require("express");

const { getHero, addHero, updateHero } = require("../controllers/hero");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/get-hero", getHero);
router.put("/update-hero", authenticateToken, updateHero);
router.post("/add-hero", authenticateToken, addHero);

module.exports = router;
