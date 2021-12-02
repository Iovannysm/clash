const mongoose = require("mongoose");
require("dotenv").config();

const connectionString =
  process.env.MONGODB_URI;

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log(
    "\x1b[36m%s\x1b[0m",
    `[${new Date().toLocaleTimeString()}] - MongoDB successfully connected...`))
  .catch(err => console.log(
    "\x1b[31m%s\x1b[0m",
    `MongoDB connection error: ${err}`));

