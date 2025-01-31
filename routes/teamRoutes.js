const express = require("express");

const router = express.Router();

const {
  createTeam,
  getTeams,
  updateTeam,
  addTeamMember,
  deleteTeam,
  getTeamById,
} = require("../controllers/teamController.js");

router.post("/", createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamById);
router.put("/:id", updateTeam);
router.put("/member/:id", addTeamMember);
router.delete("/:id", deleteTeam);

module.exports = router;
