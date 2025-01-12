const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "Yetki yok!" });

  try {
    jwt.verify(token, secretKey, (err, user) => {
      if (err)
        return res
          .status(401)
          .json({ message: "Geçersiz token! Lütfen giriş yapın." });
      req.user = user;
      next();
    });
  } catch (error) {
    console.log("HATAAAA", error);
    res.status(500).json({ message: "Token'de bir hata oluştu!" });
  }
};

module.exports = authenticateToken;
