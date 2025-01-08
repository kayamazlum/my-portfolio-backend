const express = require("express");
const { getAbout, addAbout, updateAbout } = require("../controllers/about");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/get-about", getAbout);
router.post("/add-about", authenticateToken, addAbout);
router.put("/update-about", authenticateToken, updateAbout);

module.exports = router;
