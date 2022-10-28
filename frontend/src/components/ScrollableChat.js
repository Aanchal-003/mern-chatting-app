import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import {  isSameUser, isSame } from "../config/ChatLogics";
import decryptedMessage from "./SingleChat";
import parse from 'html-react-parser';


var CryptoJS = require("crypto-js");

const { REACT_APP_SECRET_KEY } = process.env;

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div
            style={{ display: "flex" }}
            key={m._id}
            >
            <span
              style={{
                color: `${
                  m.sender._id === user._id ? "white" : "white"
                  }`,
                backgroundColor: `${
                  m.sender._id === user._id ? "#50C878" : "#50C878"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSame(messages, m, user._id) ? "auto" : 0,
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              {parse(CryptoJS.AES.decrypt(m.content,process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8))}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
