import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser, selectUserByUsername } from "./usersSlice";

export const UserLoginPage = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLoginClick = (e) => {
    if (canLogin && Boolean(selectUserByUsername(username))) {
      dispatch(
        loginUser({
          username,
          password,
        })
      );
      setUsername("");
      setPassword("");
    } else {
      alert("User doesn't exist!");
    }
  };

  const canLogin = Boolean(username) && Boolean(password);

  return (
    <div>
      <h2>User sign up</h2>
      <form>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={onUsernameChange}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
        />
        <br />
        <input
          type="button"
          value="Sign Up"
          onClick={onLoginClick}
          disabled={!canLogin}
        />
      </form>
    </div>
  );
};
