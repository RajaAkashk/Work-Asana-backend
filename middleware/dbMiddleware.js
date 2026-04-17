const { intializeDatabase } = require("../config/db.connect");

const connectDBMiddleware = async (req, res, next) => {
  try {
    await intializeDatabase();
    next();
  } catch (err) {
    res.status(500).json({ error: "DB Connection Failed" });
  }
};

module.exports = connectDBMiddleware;
