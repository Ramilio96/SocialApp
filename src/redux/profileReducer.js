import { profileAPI } from "../api/api";

const UPDATE_STATUS = "UPDATE_STATUS";
const USER_PROFILE = "USER_PROFILE";
const OTHER_USER_PROFILE = "OTHER_USER_PROFILE";
const SAVE_PHOTO = "SAVE_PHOTO";

let initialState = {
  status: "",
  profile: null,
  otherProfile: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }

    case OTHER_USER_PROFILE: {
      return { ...state, otherProfile: action.otherProfile };
    }

    case SAVE_PHOTO: {
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    }

    default:
      return state;
  }
};

export const updateStatusAC = (status) => ({
  type: UPDATE_STATUS,
  status,
});

const getUserProfileAC = (profile) => ({
  type: USER_PROFILE,
  profile,
});

const getOtherUserProfileAC = (otherProfile) => ({
  type: OTHER_USER_PROFILE,
  otherProfile,
});

const savePhotoAC = (photos) => ({
  type: SAVE_PHOTO,
  photos,
});

export const getOtherUserProfile = (userId) => async (dispatch) => {
  try {
    let response = await profileAPI.getProfile(userId);
    dispatch(getOtherUserProfileAC(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(getUserProfileAC(response.data));
};

export const getUserStatus = (userId) => async (dispatch) => {
  try {
    let response = await profileAPI.getStatus(userId);
    dispatch(updateStatusAC(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateUserStatus = (status) => async (dispatch) => {
  try {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
      dispatch(updateStatusAC(status));
    }
  } catch (error) {
    console.log(error);
  }
};

export const savePhoto = (photos) => async (dispatch) => {
  try {
    let response = await profileAPI.savePhoto(photos);

    if (response.data.resultCode === 0) {
      dispatch(savePhotoAC(response.data.data.photos));
    }
  } catch (error) {
    console.log(error);
  }
};

export default profileReducer;
