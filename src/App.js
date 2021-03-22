/* 
App component that activates the main components for users.
*/
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import ApplicationViews from "./AppViews";
import { Login } from "./components/Auth/Login";
import { Logout } from "./components/Auth/Logout";
//import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <>
        <Route
          render={() => {
            if (localStorage.getItem("zotero_user")) {
              return (
                <>
                  <NavBar />
                  <ApplicationViews />
                </>
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
      </>
    );
  }
}

export default App;
