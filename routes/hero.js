const express = require("express");

const { getHero, addHero, updateHero } = require("../controllers/hero");

const router = express.Router();

router.get("/get-hero", getHero);
router.put("/update-hero", updateHero);
router.post("/add-hero", addHero);

module.exports = router;
