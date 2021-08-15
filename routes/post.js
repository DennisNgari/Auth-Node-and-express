const express = require("express");
const postModel = require("../models/post");
const app = express();

//Get
app.get("/posts", async (request, response) => {
  const posts = await postModel.find({});

  try {
    response.send(posts);
  } catch (error) {
    response.status(500).send(error);
  }
});

//Get by Id

//Post
app.post("/posts/post", async (req, res) => {
  const post = new postModel({
    title: req.body.title,
    category: req.body.category,
    field: req.body.field,
    author: req.body.author,
  });

  try {
    await post.save();
    console.log("saved..");
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update
app.patch("posts/post/:id", async (request, response) => {
  try {
    await postModel.findByIdAndUpdate(request.params.id, request.body);
    await postModel.save();
    response.send(post);
    console.log("entry made..");
  } catch (error) {
    response.status(500).send(error);
  }
});

//Delete
app.delete("posts/post/:id", async (request, response) => {
  try {
    const post = await postModel.findByIdAndDelete(request.params.id);

    if (!post) response.status(404).send("No item found");
    return;
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
