const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const Document = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  _id: String,
  data: Object,
});

module.exports = model("Document", Document);
