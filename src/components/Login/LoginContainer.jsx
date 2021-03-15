import React from "react";
import { connect } from "react-redux";
import { logIn } from "../../redux/authReducer";
import { Login } from "./Login";

const LoginContainer = (props) => {
  return (
    <div>
      <Login {...props} />
    </div>
  );
};

let mapStateToProps = (state) => ({
  isAuth: state.authPage.isAuth,
  errorMsg: state.authPage.errorMsg,
  captchaUrl: state.authPage.captchaUrl,
});

export default connect(mapStateToProps, { logIn })(LoginContainer);
