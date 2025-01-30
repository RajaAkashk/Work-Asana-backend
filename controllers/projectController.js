const Project = require("../models/projects.model");

exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(200).json({ savedProject });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.allProject = async (req, res) => {
  const { status } = req.query;
  // Initialize filter object
  let filter = {};

  // If status is provided, filter by status
  if (status) {
    filter.status = status;
  }

  try {
    const project = await Project.find(filter);
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updatedProject = Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = new Project.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
