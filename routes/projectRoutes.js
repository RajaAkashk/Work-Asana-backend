const express = require("express");
const router = express.Router();

const {
  createProject,
  allProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.post("/", createProject);
router.get("/", allProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
