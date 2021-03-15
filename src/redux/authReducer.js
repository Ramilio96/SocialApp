import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const FAILED_USER_DATA = " FAILED_USER_DATA";
const GET_CAPTCHA = "GET_CAPTCHA";

let initialState = {
  userId: null,
  email: "",
  login: "",
  captchaUrl: "",
  isAuth: false,
  errorMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload, errorMsg: null };
    case FAILED_USER_DATA:
      return { ...state, errorMsg: action.error };
    case GET_CAPTCHA:
      return { ...state, captchaUrl: action.captchaUrl };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const failedAuthUserData = (error) => ({
  type: FAILED_USER_DATA,
  error,
});

export const getCaptchaAC = (captchaUrl) => ({
  type: GET_CAPTCHA,
  captchaUrl,
});

export const getAuthUserData = () => (dispatch) => {
  try {
    authAPI.me().then((res) => {
      if (res.data.resultCode === 0) {
        let { id, email, login } = res.data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCaptcha = () => async (dispatch) => {
  try {
    let response = await authAPI.getCaptchaUrl();
    dispatch(getCaptchaAC(response.data.url));
  } catch (error) {
    console.log(error);
  }
};

export const logIn = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  try {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptcha());
      }
      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "some error";
      dispatch(failedAuthUserData(message));
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => (dispatch) => {
  try {
    authAPI.logout().then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default authReducer;
