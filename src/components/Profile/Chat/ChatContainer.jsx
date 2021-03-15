import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../../redux/profile-selectors";
import { Chat } from "./Chat";

export const ChatContainer = (props) => {
  const ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );

  const [messages, setmessages] = useState([]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    ws.addEventListener("message", (e) => {
      let newMessages = JSON.parse(e.data);
      setmessages((prevMessages) => [...prevMessages, ...newMessages]);
      scrollToBottom();
    });
  }, []);

  return (
    <div>
      <Chat
        {...props}
        messages={messages}
        setmessages={setmessages}
        messagesEndRef={messagesEndRef}
        ws={ws}
      />
    </div>
  );
};

let mapStateToProps = (state) => ({
  profile: getProfile(state),
});

export default connect(mapStateToProps)(ChatContainer);
