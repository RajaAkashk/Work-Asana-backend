const Tag = require("../models/tags.model");

// Create a new tag
exports.createTag = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Tag name is required" });
  }

  try {
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(400).json({ message: "Tag already exists" });
    }

    const newTag = new Tag({ name });
    const savedTag = await newTag.save();
    res
      .status(201)
      .json({ message: "Tag created successfully", tag: savedTag });
  } catch (err) {
    res.status(500).json({ message: "Error creating tag", error: err.message });
  }
};

// Get all tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tags", error: err.message });
  }
};

// Get a tag by ID
exports.getTagById = async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tag", error: err.message });
  }
};

// Update a tag by ID
exports.updateTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    tag.name = name || tag.name; // Only update if a new name is provided
    const updatedTag = await tag.save();
    res
      .status(200)
      .json({ message: "Tag updated successfully", tag: updatedTag });
  } catch (err) {
    res.status(500).json({ message: "Error updating tag", error: err.message });
  }
};

// Delete a tag by ID
exports.deleteTag = async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    await tag.remove();
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting tag", error: err.message });
  }
};
