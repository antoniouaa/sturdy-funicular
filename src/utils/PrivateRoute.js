import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// import { isUserLoggedIn } from "../features/Users/userSlice";

export const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
  const loggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <Route
      {...rest}
      render={() =>
        loggedIn && restricted ? <Redirect to="/" /> : <Component />
      }
    />
  );
};
