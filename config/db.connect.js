// const mongoose = require("mongoose");
// require("dotenv").config();

// const mongoUri = process.env.MONGODB;

// const intializeDatabase = async () => {
//   await mongoose
//     .connect(mongoUri)
//     .then(() => console.log("Successfully connected to Database."))
//     .catch(() => console.log("Error in connecting to Database."));
// };

// module.exports = { intializeDatabase };

const mongoose = require("mongoose");

let isConnected = false;

const intializeDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB);

    isConnected = db.connections[0].readyState;
    console.log("Successfully connected to Database.");
  } catch (err) {
    console.log("Error in connecting to Database.", err);
    throw err;
  }
};

module.exports = { intializeDatabase };
