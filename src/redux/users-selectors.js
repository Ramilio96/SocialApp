import { createSelector } from "reselect";

const getUsers = (state) => {
  return state.usersPage.users;
};

export const getUsersSelector = createSelector(getUsers, (users) => {
  return users.filter((u) => true);
});

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
};

export const getFollowedUsers = (state) => {
  return state.usersPage.followedUsers;
};

export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress;
};

export const getFilterUsers = (state) => {
  return state.usersPage.getFilterUsers;
};