const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
