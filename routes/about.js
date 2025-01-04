const express = require("express");
const { getAbout, addAbout, updateAbout } = require("../controllers/about");

const router = express.Router();

router.get("/get-about", getAbout);
router.post("/add-about", addAbout);
router.put("/update-about", updateAbout);

module.exports = router;
