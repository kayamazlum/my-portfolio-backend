const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const secretKey = process.env.JWT_SECRET || "your_secret_key";

// Kullanıcı kayıt
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ newUser, message: "Kullanıcı başarıyla kaydedildi" });
  } catch (error) {
    res.status(500).json({ message: "Kayıt sırasında hata oluştu", error });
  }
};

// Kullanıcı giriş
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Kullanıcı adı veya şifre yanlış" });
    }

    // Şifreyi doğrula
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Kullanıcı adı veya şifre yanlış" });
    }

    // Token oluştur
    const token = jwt.sign(
      { id: user._id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    // Yanıtı döndür
    res.json({
      user: { id: user._id, username: user.username },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Bir hata oluştu", error });
  }
};

module.exports = { register, login };
