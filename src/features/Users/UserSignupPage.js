import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { signUpUser } from "./usersSlice";

export const UserSignupPage = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onSignupClick = (e) => {
    if (canSignup) {
      console.log(username, password, email);
      dispatch(
        signUpUser({
          username,
          password,
          email: email.toLowerCase(),
        })
      );
      setUsername("");
      setPassword("");
      setEmail("");
    }
  };

  const canSignup = Boolean(username) && Boolean(email) && Boolean(password);

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
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" value={email} onChange={onEmailChange} />
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
          onClick={onSignupClick}
          disabled={!canSignup}
        />
      </form>
    </div>
  );
};
