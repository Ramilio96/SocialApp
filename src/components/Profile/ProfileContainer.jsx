import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
} from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
import { Profile } from "./Profile";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { getAuth, getProfile, getStatus } from "../../redux/profile-selectors";

const ProfileContainer = (props) => {
  useEffect(() => {
    let userId = props.match.params.userId;
    if (!userId) {
      userId = props.authorizedUserId;
    }
    props.getUserProfile(userId);
    props.getUserStatus(userId);
  }, [props.getUserProfile]);
  return (
    <div>
      <Profile {...props} />
    </div>
  );
};

let mapStateToProps = (state) => ({
  profile: getProfile(state),
  status: getStatus(state),
  authorizedUserId: getAuth(state),
});

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
