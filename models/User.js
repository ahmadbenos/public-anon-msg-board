const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
