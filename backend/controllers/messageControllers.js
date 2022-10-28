const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const { encrypt, decrypt } = require("../encryption/encrypt");

var CryptoJS = require("crypto-js");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  // var newcontent = encrypt(content);

  var newMessage = {
    sender: req.user._id,
    content: CryptoJS.AES.encrypt(content, process.env.SECRET_KEY).toString(),
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// using req.params bcoz chatId is inside parameters(/:chatId)

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");


    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const decryptMessages = asyncHandler(async (req, res) => {
  const { content, iv } = req.body;
  try {
    res.json(decrypt({ content, iv }));
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = { sendMessage, allMessages, decryptMessages };
