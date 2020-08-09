const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
    trim: true,
  },
  longUrl: {
    type: String,
    required: true,
    trim: true,
  },
});

const urlModel = mongoose.model("urls", urlSchema);

module.exports = urlModel;
