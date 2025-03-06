const express = require("express");
const cors = require("cors");
const { intializeDatabase } = require("./config/db.connect");
const dotenv = require("dotenv");

dotenv.config();
intializeDatabase();

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tags", require("./routes/tagRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}.`));
