const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    image_url: { type: [String], required: true },
    skills: { type: [String], required: true },
    site_url: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Projects", projectsSchema);
