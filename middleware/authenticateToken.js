const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = req.headers["authorization"];
  console.log(req.headers);
  console.log("SECRETTTT", secretKey);

  console.log("BACKEND TOKENİ", token);

  if (!token) return res.status(401).json({ message: "Yetki yok!" });

  try {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(401).json({ message: "Geçersiz token!" });
      res.user = user;
      next();
    });
  } catch (error) {
    console.log("HATAAAA", error);
  }
};

module.exports = authenticateToken;
