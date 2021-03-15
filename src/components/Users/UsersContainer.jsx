import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import {
  getUsersSelector,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowedUsers,
  getFollowingInProgress,
  getFilterUsers,
} from "../../redux/users-selectors";
import {
  setCurrentPage,
  getUsers,
  toggleIsFetching,
  followUser,
  unfollowUser,
} from "../../redux/usersReducer";
import { Users } from "./Users";

const UsersContainer = (props) => {
  useEffect(() => {
    props.getUsers(props.currentPage, props.pageSize);
  }, [props.getUsers]);

  const onPageChanged = (pageNumber) => {
    props.getUsers(pageNumber, props.pageSize, "");
  };

  const onFilterChanged = (filter) => {
    props.getUsers(1, props.pageSize, filter);
  };
  return (
    <div>
      <Users
        {...props}
        onPageChanged={onPageChanged}
        onFilterChanged={onFilterChanged}
      />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followedUsers: getFollowedUsers(state),
    followingInProgress: getFollowingInProgress(state),
    filterUsers: getFilterUsers(state),
  };
};
export default withAuthRedirect(
  connect(mapStateToProps, {
    setCurrentPage,
    getUsers,
    toggleIsFetching,
    followUser,
    unfollowUser,
  })(UsersContainer)
);
