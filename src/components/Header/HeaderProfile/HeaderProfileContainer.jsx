import React from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { HeaderProfile } from "./HeaderProfile";

const HeaderProfileContainer = (props) => {
  return (
    <div>
      {props.profile ? (
        <HeaderProfile {...props} />
      ) : (
        <Spinner animation="border" variant="secondary" />
      )}
    </div>
  );
};

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

export default connect(mapStateToProps)(HeaderProfileContainer);
