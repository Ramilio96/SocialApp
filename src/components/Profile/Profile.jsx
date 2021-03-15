import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner, Form } from "react-bootstrap";
import ChatContainer from "./Chat/ChatContainer";
import PropTypes from "prop-types";

export const Profile = ({
  profile,
  status,

  updateUserStatus,
  savePhoto,
}) => {
  const [statusToggle, setstatusToggle] = useState(false);
  const [stateStatus, setstateStatus] = useState(status);
  const [statePhoto, setstatePhoto] = useState("Изменить аватар");

  useEffect(() => {
    setstateStatus(status);
  }, [status]);

  const onActivateStatus = () => {
    setstatusToggle(true);
  };

  const onDeactivateStatus = () => {
    setstatusToggle(false);
    updateUserStatus(stateStatus);
  };

  const onChangeStatus = (e) => {
    setstateStatus(e.currentTarget.value);
  };

  const onChangePhoto = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
      setstatePhoto(e.target.files[0].name);
    }
  };

  return (
    <div>
      <Container className="pt-5  m-auto">
        {profile ? (
          <Row>
            <Col
              md={4}
              className="d-flex flex-column align-items-center  align-items-lg-start "
            >
              <Image
                src={
                  profile.photos.large ||
                  "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                }
                width="300px"
                height="300px"
                rounded
              />
              <Form className="my-2">
                <Form.File
                  onChange={onChangePhoto}
                  type="file"
                  id="custom-file"
                  label={statePhoto}
                  custom
                />
              </Form>
              <h1>{profile.fullName}</h1>
              {statusToggle ? (
                <input
                  autoFocus={true}
                  onBlur={onDeactivateStatus}
                  onChange={onChangeStatus}
                  value={stateStatus}
                  type="text"
                />
              ) : (
                <span onClick={onActivateStatus}>{status || "Add status"}</span>
              )}
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

Profile.propTypes = {
  profile: PropTypes.object,
  status: PropTypes.string,
  updateUserStatus: PropTypes.func,
  savePhoto: PropTypes.func,
};
