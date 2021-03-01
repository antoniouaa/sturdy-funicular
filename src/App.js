import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

import { Navbar } from "./app/Navbar";
import { Sidebar } from "./app/Sidebar";
import { EditSequenceForm } from "./features/Sequences/EditSequenceForm";
import { SequencePage } from "./features/Sequences/SequencePage";
import { SequencesList } from "./features/Sequences/SequencesList";
import { UserSignupPage } from "./features/Users/UserSignupPage";
import { UserLoginPage } from "./features/Users/UserLoginPage";
import { UserLogoutPage } from "./features/Users/UserLogoutPage";
import { HomePage } from "./features/Users/UserHomePage";
import { PrivateRoute } from "./utils/PrivateRoute";
import {
  isUserLoggedIn,
  getToken,
  fetchRefreshToken,
} from "./features/Users/userSlice";

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(isUserLoggedIn);
  const token = useSelector(getToken);

  useEffect(() => {
    if (loggedIn) {
      setInterval(() => {
        dispatch(fetchRefreshToken(token));
      }, 50000);
    }
  }, [loggedIn]);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Sidebar />
        <Switch>
          <Route exact path="/" component={SequencesList} />
          <Route exact path="/signup" component={UserSignupPage} />
          <Route exact path="/login" component={UserLoginPage} />
          <Route exact path="/logout" component={UserLogoutPage} />
          <Route exact path="/sequences/:sequenceId" component={SequencePage} />
          <Route
            exact
            path="/sequences/:sequenceId/edit"
            component={EditSequenceForm}
          />
          <PrivateRoute
            exact
            path="/home"
            restricted={true}
            component={HomePage}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
