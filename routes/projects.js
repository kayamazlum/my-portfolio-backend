const express = require("express");
const {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  detailsProject,
} = require("../controllers/projects");
const upload = require("../middleware/uploadImage");

const router = express.Router();

router.get("/get-projects", getProjects);

router.post("/add-project", upload.array("images", 10), addProject);

router.put("/update-project", upload.array("images", 10), updateProject);

router.delete("/delete-project", deleteProject);

router.get("/details-project", detailsProject);

module.exports = router;
