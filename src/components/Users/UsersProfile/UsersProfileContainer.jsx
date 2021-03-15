import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getUserProfile,
  getOtherUserProfile,
  getUserStatus,
  updateUserStatus,
} from "../../../redux/profileReducer";
import { withRouter } from "react-router-dom";
import { UsersProfile } from "./UsersProfile";
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";

const UsersProfileContainer = (props) => {
  useEffect(() => {
    let userId = props.match.params.userId;
    props.getOtherUserProfile(userId);
  }, [props.getOtherUserProfile]);
  return (
    <div>
      <UsersProfile {...props} />
    </div>
  );
};

let mapStateToProps = (state) => ({
  otherProfile: state.profilePage.otherProfile,
  authorizedUserId: state.authPage.userId,
});

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    getOtherUserProfile,
  }),
  withRouter,
  withAuthRedirect
)(UsersProfileContainer);
