import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginUser } from "./userSlice";

export const UserLoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLoginClick = async () => {
    const res = await dispatch(
      loginUser({
        username,
        password,
      })
    );
    if (res.error) {
      alert("user does not exist");
      return;
    }
    history.push("/home");
  };

  const canLogin = Boolean(username) && Boolean(password);

  return (
    <div>
      <h1>Login</h1>
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
          value="Log in"
          onClick={onLoginClick}
          disabled={!canLogin}
        />
      </form>
      <p>
        Don't have an account? <br />
        <input
          type="button"
          value="Sign up"
          onClick={() => history.push("/signup")}
        />
      </p>
    </div>
  );
};
