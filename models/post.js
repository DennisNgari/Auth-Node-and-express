const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  category: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  field: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  author: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", UserSchema);
module.exports = Post;
