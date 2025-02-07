const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  getTaskById,
  deleteTask,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
