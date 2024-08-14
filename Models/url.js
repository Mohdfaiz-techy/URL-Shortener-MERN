const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    shortId: {
      type: "string",
      required: true,
      unique: true,
    },
    reDirectURL: {
      type: "string",
      required: true,
    },

    visilHistory: [{ timestamps: { type: Number } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);
module.exports = URL;
