import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logoutUser, isUserLoggedIn } from "./userSlice";

export const UserLogoutPage = () => {
  const loginState = useSelector(isUserLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const onHomeClick = () => {
    console.log(loginState);
    dispatch(logoutUser());
    console.log(loginState);
    history.push("/home");
  };

  return (
    <div>
      <input type="button" onClick={onHomeClick} value="Log out?" />
    </div>
  );
};
