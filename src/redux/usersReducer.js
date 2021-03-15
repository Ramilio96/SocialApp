import { usersAPI } from "../api/api";

const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "CURRENT_PAGE";
const SET_TOTAL_USERS = "SET_TOTAL_USERS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const FOLLOW_USERS = "FOLLOW_USERS";
const FOLLOWING_IN_PROGRESS = "FOLLOWING_IN_PROGRESS";
const SET_FILTER_USERS = "SET_FILTER_USERS";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
  followedUsers: [],
  filterUsers: {
    term: "",
  },
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS: {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case FOLLOWING_IN_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    }
    case FOLLOW_USERS: {
      return {
        ...state,
        followedUsers: state.users.filter((u) => u.followed),
      };
    }

    case SET_FILTER_USERS: {
      return { ...state, filterUsers: action.filterUsers };
    }

    default:
      return state;
  }
};

export const followingInProgressAC = (isFetching, userId) => ({
  type: FOLLOWING_IN_PROGRESS,
  isFetching,
  userId,
});

export const setUsersAC = (users) => ({
  type: SET_USERS,
  users,
});

export const setTotalUsers = (totalUsersCount) => ({
  type: SET_TOTAL_USERS,
  totalUsersCount,
});

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const followAC = (userId) => ({
  type: FOLLOW,
  userId,
});

export const unfollowAC = (userId) => ({
  type: UNFOLLOW,
  userId,
});

export const followUsersAC = (userId) => ({
  type: FOLLOW_USERS,
  userId,
});

export const setFilterUsers = (filterUsers) => ({
  type: SET_FILTER_USERS,
  filterUsers,
});

export const getUsers = (currentPage, pageSize, filterUsers) => async (
  dispatch
) => {
  try {
    dispatch(toggleIsFetching(true));
    dispatch(setFilterUsers(filterUsers));
    let data = await usersAPI.getUsers(currentPage, pageSize, filterUsers);
    dispatch(toggleIsFetching(false));
    dispatch(setUsersAC(data.items));
    dispatch(setTotalUsers(data.totalCount));
  } catch (error) {
    console.log(error);
  }
};

export const followUser = (userId) => async (dispatch) => {
  try {
    dispatch(followingInProgressAC(true, userId));

    let response = await usersAPI.follow(userId);
    if (response.data.resultCode === 0) {
      dispatch(followAC(userId));
      dispatch(followUsersAC(userId));
    }

    dispatch(followingInProgressAC(false, userId));
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = (userId) => async (dispatch) => {
  try {
    dispatch(followingInProgressAC(true, userId));

    let response = await usersAPI.unfollow(userId);
    if (response.data.resultCode === 0) {
      dispatch(unfollowAC(userId));
      dispatch(followUsersAC(userId));
    }
    dispatch(followingInProgressAC(false, userId));
  } catch (error) {
    console.log(error);
  }
};

export default usersReducer;
