export const getProfile = (state) => {
  return state.profilePage.profile;
};

export const getStatus = (state) => {
  return state.profilePage.status;
};

export const getAuth = (state) => {
  return state.authPage.userId;
};
