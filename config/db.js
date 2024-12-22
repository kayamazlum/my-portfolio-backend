const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongo DB'ye bağlandı!");
    })
    .catch((err) => {
      throw new Error("DB bağlantısında hata!", 404);
    });
};

module.exports = db;
