import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logoutUser } from "./userSlice";

export const UserLogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onHomeClick = () => {
    dispatch(logoutUser());
    history.push("/home");
  };

  return (
    <div>
      <h1>Log out?</h1>
      <input type="button" onClick={onHomeClick} value="Log out?" />
    </div>
  );
};
