import React from "react";
import Message from "./Message/Message";
import { ListGroup } from "react-bootstrap";
import { AddMessageForm } from "./AddMessageForm/AddMessageForm";

export const Chat = ({ messages, messagesEndRef, ws, profile }) => {
  const chatStyle = {
    height: "55vh",
    overflowY: "auto",
    border: "1px solid gray",
  };
  let messageElements = messages.map((m, index) => (
    <Message key={index} message={m} />
  ));

  return (
    <>
      <ListGroup className="mb-4" style={chatStyle}>
        {messageElements.length ? (
          messageElements
        ) : (
          <h4 className="text-center mt-5">No messages...</h4>
        )}
        <div ref={messagesEndRef} />
      </ListGroup>
      <AddMessageForm ws={ws} profile={profile} />
    </>
  );
};
