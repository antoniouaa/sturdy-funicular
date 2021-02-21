import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import { Navbar } from "./app/Navbar";
import { Sidebar } from "./app/Sidebar";
import { AddSequenceForm } from "./features/Sequences/AddSequenceForm";
import { EditSequenceForm } from "./features/Sequences/EditSequenceForm";
import { SequencePage } from "./features/Sequences/SequencePage";
import { SequencesList } from "./features/Sequences/SequencesList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Sidebar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                {/* <AddSequenceForm /> */}
                <SequencesList />
              </React.Fragment>
            )}
          />
          <Route exact path="/sequences/:sequenceId" component={SequencePage} />
          <Route
            exact
            path="/sequences/:sequenceId/edit"
            component={EditSequenceForm}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
