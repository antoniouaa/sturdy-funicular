import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import { Navbar } from "./app/Navbar";
import { AddSequenceForm } from "./features/Sequences/AddSequenceForm";
import { SequencePage } from "./features/Sequences/SequencePage";
import { SequencesList } from "./features/Sequences/SequencesList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddSequenceForm />
                <SequencesList />
              </React.Fragment>
            )}
          />
          <Route exact path="/sequences/:sequenceId" component={SequencePage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
