import React from "react";
import { Row, Image, ListGroup } from "react-bootstrap";

export default function Message({ message }) {
  const fontBold = {
    fontWeight: "bold",
  };
  return (
    <div>
      <ListGroup.Item>
        <Row>
          <Image
            src={message.photo}
            width="35px"
            height="35px"
            className="mx-2"
            roundedCircle
          />
          <p style={fontBold}>{message.userName}</p>
        </Row>
        <Row>
          <p className="mx-2">{message.message}</p>
        </Row>
      </ListGroup.Item>
    </div>
  );
}
