const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  price: Number,
  currency: String,
  creatorId: String,
  created: Number,
  modified: Number,
  categories: mongoose.Types.Array
});

module.exports = mongoose.model("Product", productsSchema);
