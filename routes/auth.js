const express = require("express");
const userModel = require("../models/user");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const user = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");
const User = require("../models/user");

//GET
//Getting All Users
app.get("/users", async (req, res) => {
  const users = await userModel.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET
// Getting a specific User by ID.
app.get("/users/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(404).send("User does not exist.");
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

//POST
//Adding a new User
app.post("/register", async (req, res) => {
  //Validate the Data before adding a new user.
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //Checking if the User Exist
  const emailExists = await userModel.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email Already Exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a New User
  const newUser = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.send({ newUser: newUser._id });
  } catch (error) {
    res.status(400).send(err);
  }
});

//POST
//LOGIN
app.post("/login", async (req, res) => {
  //Validate the data before the user Logs in.
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Checking if the User Exist
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email Doesnt exist!");
  //Checking if the password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password!");

  //Create and asign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);

  // res.status(200).send("Logged In");
});

//PATCH
//Updating users's Login Credentials.
app.patch("/users/update/:userId", async (req, res) => {
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.userid,
      req.body
    );
    await userModel.save();
    response.send("User Updated");
  } catch (error) {
    response.status(500).send(error);
  }
});

//DELETE
//Removing users from the database.
app.delete("/users/:userId", async (req, res) => {
  try {
    const removedPost = await userModel.findByIdAndDelete(req.params.userId);
    if (!removedPost) return res.status(404).send("No item found");
    res.status(200).send("Deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = app;
