import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import PasswordForgot from "../pages/PasswordForgot";
import SignUp from "../pages/SignUp";

const AuthNavigator = () => {
  return (
    <Switch>
      <Route path="/signup" component={SignUp} />
      <Route path="/password-forgot" component={PasswordForgot} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Login} />
    </Switch>
  );
};
export default AuthNavigator;
