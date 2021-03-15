import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
let mapStateToPropsForRedirect = (state) => ({
  isAuth: state.authPage.isAuth,
});

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    return (
      <div>
        {props.isAuth ? <Component {...props} /> : <Redirect to="/login" />}
      </div>
    );
  };
  return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
