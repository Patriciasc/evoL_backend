const mongoose = require("mongoose");
const { text } = require("express");

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User is required"],
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
    required: [true, "Item is required"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
  state: {
    type: String,
    enum: ["En espera", "Aceptado", "Denegado"],
    default: "En espera",
  },
});

const requestModel = mongoose.model("request", requestSchema);
module.exports = requestModel;
