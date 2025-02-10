const Task = require("../models/tasks.model");

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    const populatedTask = await Task.findById(savedTask._id).populate("owners");
    res.status(201).json(populatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskById = await Task.findById(req.params.id)
      .populate("project")
      .populate("owners")
      .populate("team");
    res.status(200).json(taskById);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const { status, prioritySort, dateSort } = req.query;

  // Initialize filter object
  let filter = {};

  // If status is provided, filter by status
  if (status) {
    filter.status = status;
  }

  // Initialize sorting options object
  let sortOptions = {};

  // Mapping for priority to numerical values
  const priorityOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  // Sorting by priority (mapping priority to numeric value for correct sorting)
  if (prioritySort === "Low-High") {
    sortOptions.priority = 1; // Ascending order (Low -> Medium -> High)
  } else if (prioritySort === "High-Low") {
    sortOptions.priority = -1; // Descending order (High -> Medium -> Low)
  }

  // Sorting by date
  if (dateSort) {
    if (dateSort === "Newest-Oldest") {
      sortOptions.createdAt = -1; // Newest first
    } else if (dateSort === "Oldest-Newest") {
      sortOptions.createdAt = 1; // Oldest first
    }
  }

  try {
    // Fetch tasks based on filter and sort options
    const tasks = await Task.find(filter)
      .sort(sortOptions)
      .populate("project")
      .populate("owners")
      .populate("team");

    // Sorting by priority manually if needed (in case of string-based priority)
    if (prioritySort) {
      tasks.sort((a, b) => {
        const priorityA = priorityOrder[a.priority] || 0; // Convert to numeric priority
        const priorityB = priorityOrder[b.priority] || 0; // Convert to numeric priority
        return prioritySort === "Low-High"
          ? priorityA - priorityB
          : priorityB - priorityA;
      });
    }

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ deletedTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
