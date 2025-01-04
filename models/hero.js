const mongoose = require("mongoose");

const heroSchema = mongoose.Schema(
  {
    hero_text: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hero", heroSchema);
