const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  name_lower: { type: String, required: true },
  ticker: { type: String, required: true },
});

module.exports = mongoose.model("List", listSchema);
