const mongoose = require("mongoose");

module.exports = chatModel = mongoose.model(
  "chat",
  new mongoose.Schema({
    name: { type: String },
    msgs: [
      {
        timeInMilliSeconds: { type: String },
        sentBy: { type: String },
        receivedBy: { type: String },
        msg: { type: String },
      },
    ],
  })
);
