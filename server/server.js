const express = require("express");
const socket = require("socket.io");
const path = require("path");
const messages = [];
let users = [];

//App setup
const port = 8000;
const app = express();
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Static files serving
app.use(express.static("./../client"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../client/index.html"));
});

//Socket setup
const io = socket(server);

//User action service
io.on("connection", function (socket) {
  let login = "";
  let id = socket.id;

  //Logged in
  socket.on("loginEvent", (loginEvent) => {
    users.push({ name: login, id });
    login = loginEvent.login;
    socket.broadcast.emit("generalMsg", {
      type: "join",
      user: login,
    });
  });

  //Message send
  socket.on("message", (message) => {
    messages.push(message);
    socket.broadcast.emit("message", message);
  });

  //Disconnect
  socket.on("disconnect", () => {
    users = users.filter((x) => x.id != id);
    socket.broadcast.emit("generalMsg", {
      type: "left",
      user: login,
    });
  });
});
