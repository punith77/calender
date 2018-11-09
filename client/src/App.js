import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./containers/Navbar";
import Schedule from "./containers/Schedule";
import Patients from "./containers/Patients";
import Profile from "./containers/Profile";
import NewPatient from "./containers/NewPatient";
import NewAppointment from "./containers/NewAppointment";
import EditPatient from "./containers/EditPatient";

import { Provider } from "react-redux";
import store from "./store";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <div className="container">
              <Navbar />
              <Route exact path="/" component={Schedule} />
              <Route exact path="/patients" component={Patients} />
              <Route exact path="/new" component={NewPatient} />
              <Route exact path="/patient/:id" component={Profile} />
              <Route exact path="/edit" component={EditPatient} />
              <Route
                exact
                path="/appointments/new"
                component={NewAppointment}
              />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
