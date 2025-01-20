const express = require("express");
const router = express.Router();

const {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} = require("../controllers/tagController");

// Route to create a new tag
router.post("/", createTag);

// Route to get all tags
router.get("/", getAllTags);

// Route to get a specific tag by ID
router.get("/:id", getTagById);

// Route to update a tag by ID
router.put("/:id", updateTag);

// Route to delete a tag by ID
router.delete("/:id", deleteTag);

module.exports = router;
