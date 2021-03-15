import React from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import ChatContainer from "../../Profile/Chat/ChatContainer";
import PropTypes from "prop-types";

export const UsersProfile = ({ otherProfile }) => {
  return (
    <div>
      <Container className="pt-5  m-auto">
        {otherProfile ? (
          <Row>
            <Col md={4} className="d-flex flex-column align-items-center">
              <Image
                src={
                  otherProfile.photos.large ||
                  "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                }
                width="300px"
                height="300px"
                rounded
              />
              <h1>{otherProfile.fullName}</h1>
              <span>{otherProfile.status || "No status"}</span>
            </Col>
            <Col md={8}>
              <ChatContainer />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md={12} className="d-flex justify-content-center">
              <Spinner
                className="my-3"
                animation="border"
                variant="secondary"
              />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

UsersProfile.propTypes = {
  otherProfile: PropTypes.object,
};
