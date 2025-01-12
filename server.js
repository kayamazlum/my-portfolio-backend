const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const about = require("./routes/about");
const projects = require("./routes/projects");
const hero = require("./routes/hero");
const user = require("./routes/user");
const validateToken = require("./routes/validateToken");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 4001;

db();

app.use("/api", user);
app.use("/api", validateToken);
app.use("/api", about);
app.use("/api", projects);
app.use("/api", hero);

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
