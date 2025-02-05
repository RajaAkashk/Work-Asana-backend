const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const intializeDatabse = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Successfully connected to Database."))
    .catch(() => console.log("Error in connecting to Database."));
};

module.exports = { intializeDatabse };
