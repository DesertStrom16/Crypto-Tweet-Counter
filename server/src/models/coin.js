const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countSchema = new Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  count: { type: Number, required: true },
  price: { type: Number, required: true },
});

const coinSchema = new Schema({
  name: { type: String, required: true },
  result: { type: [countSchema], default: undefined },
  gatherStart: {type: String, required: true},
  gatherEnd: {type: String, required: true},
});

module.exports = mongoose.model("Coin", coinSchema);
