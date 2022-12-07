const chatRouter = require("express").Router();
const chatModel = require("../../models/chatModel/index");
const mongoose = require("mongoose");

chatRouter.get("/getMsgs/:user1/:user2", (req, res) => {
  try {
    const { user1, user2 } = req.params;

    chatModel.find(
      { $or: [{ name: user2 + "~" + user1 }, { name: user1 + "~" + user2 }] },
      (error, result) => {
        if (error) throw error;
        else {
          return res.status(200).json({ result });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: error,
      success: false,
    });
  }
});

chatRouter.post("/create", (req, res) => {
  try {
    const { timeInMilliSeconds, sentBy, receivedBy, msg } = req.body;

    let model = new chatModel({
      name: sentBy + "~" + receivedBy,
      msgs: [
        {
          timeInMilliSeconds,
          sentBy,
          receivedBy,
          msg,
        },
      ],
    });

    model.save(function (err) {
      if (err) {
        throw err;
      } else {
        return res.status(200).json({
          message: "Message created successfully",
          success: true,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      success: false,
    });
  }
});

chatRouter.put("/insert", async (req, res) => {
  try {
    const { id, timeInMilliSeconds, sentBy, receivedBy, msg } = req.body;

    let model = await chatModel.findById({ _id: id });
    model.msgs.push({
      timeInMilliSeconds,
      sentBy,
      receivedBy,
      msg,
    });

    model
      .save()
      .then((result) => {
        return res.status(200).json({
          message: "document updated successfully",
          success: true,
        });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    return res.status(500).json({
      message: error,
      success: false,
    });
  }
});

module.exports = chatRouter;
