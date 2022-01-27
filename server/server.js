const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

app.use(express.static("./../client"));

const messages = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../client/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
