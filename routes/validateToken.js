const express = require("express");
const authenticateToken = require("../middleware/authenticateToken"); // Middleware dosyasının yolu

const router = express.Router();

router.get("/validate-token", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Token geçerli",
    user: req.user,
  });
});

module.exports = router;
