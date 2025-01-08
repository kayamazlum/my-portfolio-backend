const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Token gerekli" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Geçersiz token" });
    res.user = user;
    next();
  });
};

module.exports = authenticateToken;
