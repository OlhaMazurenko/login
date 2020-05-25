"use strict";

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../routes";
import AuthNavbar from "../components/AuthNavbar";
import sign_in from "../img/backgrounds/sign_in.jpg";
import sign_up from "../img/backgrounds/sign_up.jpg";
import styled from "styled-components";

const Auth = props => {
  const wrapper = React.createRef();

  const getRoutes = routes => {
    return routes.map((route, key) => {
      if (route.layout === "/auth") {
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

  const getBgImage = () => {
    if (
      window.location.pathname.indexOf("/auth/login-page") !== -1 ||
      window.location.pathname === `/auth`
    ) {
      return sign_in;
    }
    if (window.location.pathname.indexOf("/auth/register-page") !== -1) {
      return sign_up;
    }
  };

  const redirectHandler = () => {
    if (
      window.location.pathname.indexOf("/auth") !== -1 &&
      (window.location.pathname.indexOf("/register-page") === -1 ||
        window.location.pathname.indexOf("/login-page") === -1)
    ) {
      return <Redirect to={{ pathname: `/auth/login-page` }} />;
    }
  };

  return (
    <DIV
      style={{
        backgroundImage: `url(${getBgImage()})`
      }}
    >
      <AuthNavbar />
      <div ref={wrapper}>
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

export default Auth;
