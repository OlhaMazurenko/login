"use strict";

import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../routes";
import UserNavBar from "../components/UserNavBar";
import styled from "styled-components";
import { getProfileAction } from "../store/actions/me";
import { connect } from "react-redux";

const User = props => {
  useEffect(() => {
    props.getProfileAction();
  }, []);

  const getRoutes = routes => {
    return routes.map((route, key) => {
      if (route.layout === "/user") {
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const redirectHandler = () => {
    if (window.location.pathname === "/") {
      return <Redirect to={{ pathname: `/user` }} />;
    }
    if (!localStorage.getItem("token")) {
      return <Redirect to={{ pathname: `/auth/login-page` }} />;
    }
  };

  return (
    <DIV>
      <UserNavBar />
      <div>
        <div>
          <Switch>{getRoutes(routes)}</Switch>
        </div>
      </div>
      {redirectHandler()}
    </DIV>
  );
};

const DIV = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const mapDispatchToProps = {
  getProfileAction
};
export default connect(null, mapDispatchToProps)(User);
