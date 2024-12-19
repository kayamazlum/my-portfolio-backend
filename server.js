const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});