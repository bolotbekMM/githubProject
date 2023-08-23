const { Schema, model } = require("mongoose");

const LogSchema = new Schema({
  ip: { type: String, required: true },
  date: { type: Date, default: new Date() },
  type: { type: String, required: true },
});

module.exports = model("LogSchema", LogSchema);
