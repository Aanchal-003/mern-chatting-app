const express = require("express");
const {
  sendMessage,
  allMessages,
  decryptMessages,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);
router.route("/decryptmessage").post(decryptMessages);

module.exports = router;
