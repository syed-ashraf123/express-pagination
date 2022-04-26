const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/test";
const User = require("./models/User");
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongodb");
  }
);

const app = express();

app.use(cors());
app.use(express.json());

//Pagination
app.get("/", async (req, res) => {
  let { page, limit, sort, asc } = req.query;
  if (!page) page = 1;
  if (!limit) limit = 10;

  const skip = (page - 1) * 10;
  const users = await User.find()
    .sort({ [sort]: asc })
    .skip(skip)
    .limit(limit);
  res.send({ page: page, limit: limit, users: users });
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
