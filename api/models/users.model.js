const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator(value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          value
        );
      },
    },
    unique: [true, "This e-mail is registered"],
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  telephone: {
    type: String,
  },
  publications: {
    // TODO
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
