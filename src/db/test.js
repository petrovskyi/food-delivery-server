const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ganeshka:gtnhjdcrbq86@homework-7flbc.mongodb.net/test?retryWrites=true&w=majority",
  { useMongoClient: true }
);

const db = mongoose.connection;

db.on("error", err => {
  console.error("connnection error");
});

db.on("open", () => {
  console.log("connected");
});
