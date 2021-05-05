const { Schema, model } = require("mongoose");

const urlSchema = new Schema({
  original_url: String,
  short_url: String,
});

module.exports = { Url: model("Url", urlSchema) };
