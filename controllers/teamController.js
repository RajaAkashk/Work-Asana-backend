const Team = require("../models/teams.model");

exports.createTeam = async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const teamById = await Team.findById(req.params.id);
    res.status(200).json(teamById);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTeam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addTeamMember = async (req, res) => {
  const { member } = req.body;
  try {
    const addMember = await Team.findByIdAndUpdate(
      req.params.id,
      { $push: { members: member } },
      {
        new: true,
      }
    );
    if (!addMember) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(addMember);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add new member", error: err.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTeam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
