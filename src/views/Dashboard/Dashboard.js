import React from "react";
import { Redirect, withRouter } from "react-router-dom";

const Dashboard = props => {
  if (localStorage.getItem("access_token")) {
    return <Redirect to={{ pathname: "/user" }} />;
  } else {
    return <Redirect to={{ pathname: "/auth/login-page" }} />;
  }
};

export default withRouter(Dashboard);
