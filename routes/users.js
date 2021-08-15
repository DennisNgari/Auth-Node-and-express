const express = require("express");
const app = express();

//Make this route private
const verify = require("../verifyToken");

app.get("/user", verify, (req, res) => {
  res.send(req.user);
});
module.exports = app;
