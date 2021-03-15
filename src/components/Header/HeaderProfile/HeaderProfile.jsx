import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";

export const HeaderProfile = ({ profile }) => {
  return (
    <div>
      {profile.photos.large ? (
        <Image
          src={profile.photos.large}
          width="35px"
          height="35px"
          className="mx-2"
          roundedCircle
          alt="avatar"
        />
      ) : (
        <Image
          src={
            "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
          }
          width="35px"
          height="35px"
          className="mx-2"
          roundedCircle
        />
      )}
    </div>
  );
};

HeaderProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};
