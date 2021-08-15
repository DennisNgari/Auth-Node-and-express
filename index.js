const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

//Import routes
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/post.js");
const usersRoute = require("./routes/users");
// connect to db
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected...");
  }
);

//Route Middlewares
app.use(usersRoute);
app.use(authRoute);
app.use(postRoute);

//server and port
app.listen(3000, () => {
  console.log("Server running...");
});
