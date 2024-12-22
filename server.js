const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const about = require("./routes/about");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT || 4001;

db();

app.use("/api", about);

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
