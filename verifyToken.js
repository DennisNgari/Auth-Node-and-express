// We create a middle ware function, we can add this middleware functiom to any route we want to be protected or private.
// This therfore checks if the user have that token which we assign when the user logs in.
// Every private route that we want to acess must have this function before it.

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied!");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token!");
  }
};
