const mongoose = require("mongoose");
// Team Schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  // just added members
  members: [{ type: String, required: true }],
});
module.exports = mongoose.model("Team", teamSchema);
