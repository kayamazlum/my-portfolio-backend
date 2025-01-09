const express = require("express");
const {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  detailsProject,
} = require("../controllers/projects");
const upload = require("../middleware/uploadImage");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/get-projects", getProjects);

router.post(
  "/add-project",

  upload.array("images", 10),
  addProject
);

router.put(
  "/update-project",
  authenticateToken,
  upload.array("images", 10),
  updateProject
);

router.delete("/delete-project", authenticateToken, deleteProject);

router.get("/details-project", authenticateToken, detailsProject);

module.exports = router;
