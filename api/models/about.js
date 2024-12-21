const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema(
  {
    about_text: { type: String, require: true },
    about_skillse: { type: [String], require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
