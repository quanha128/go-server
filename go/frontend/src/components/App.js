import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Game from "./Game";
import Lobby from "./Lobby";
import Login from "./Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
    };
  }

  login(token) {
    this.setState({
      token: token,
      isLoggedIn: true,
    });
  }

  logout() {
    this.setState({
      token: "",
      isLoggedIn: false,
    });
  }

  leaveGame() {
    this.setState({
      gameId: "",
    });
  }

  joinGame(data) {
    this.setState({
      gameId: data.code,
    });
    // check if game is still up
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/login"
            render={(props) => {
              return (
                <Login {...props} onLogin={(token) => this.login(token)} />
              );
            }}
          ></Route>
          <Route
            path="/game/:code"
            render={(props) => (
              <Game {...props} leaveGameCallback={() => this.leaveGame()} />
            )}
          ></Route>
          <Route
            path="/"
            render={(props) => {
              return this.state.isLoggedIn == true ? (
                <Lobby
                  {...props}
                  joinGameCallback={(data) => this.joinGame(data)}
                  onLogout={() => this.logout()}
                />
              ) : (
                <Redirect to="/login"></Redirect>
              );
            }}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
