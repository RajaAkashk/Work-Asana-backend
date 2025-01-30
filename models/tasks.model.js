const mongoose = require("mongoose");

// Task Schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  }, // Refers to Project model
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
    required: true,
  }, // Refers to Team model
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workasan_user",
      required: true,
    },
  ], // Refers to User model (owners)
  tags: [
    {
      type: String,
    },
  ], // Array of tags
  timeToComplete: {
    type: Number,
    required: true,
  }, // Number of days to complete the task
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed", "Blocked"],
    default: "To Do",
  }, // Enum for task status
  priority: {
    type: String,
    default: "Low",
    enum: ["Low", "Medium", "High"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically update the `updatedAt` field whenever the document is updated
taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Tasks", taskSchema);
