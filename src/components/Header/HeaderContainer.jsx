import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import { Header } from "./Header";

const HeaderContainer = (props) => {
  return (
    <div>
      <Header {...props} />
    </div>
  );
};

let mapStateToProps = (state) => ({
  isAuth: state.authPage.isAuth,
  login: state.authPage.login,
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
