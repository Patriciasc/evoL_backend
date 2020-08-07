const mongoose = require("mongoose");
const { text } = require("express");

const itemSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User is required"],
  },
  imageURL: {
    type: String,
    required: [true, "Image is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const itemModel = mongoose.model("item", itemSchema);
module.exports = itemModel;
