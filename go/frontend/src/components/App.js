import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getCookie } from "../helper";
import Game from "./Game";
import Lobby from "./Lobby";
import Login from "./Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
      isLoggedIn: null,
    };
  }

  componentDidMount() {
    const csrftoken = getCookie("csrftoken");
    let isLoggedIn;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken },
    };
    fetch("/api/is-logged-in", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ isLoggedIn: data.is_logged_in });
        this.forceUpdate();
      });
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
            exact
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
          <Route
            path="/login"
            render={(props) => {                  
              return this.state.isLoggedIn == true ? (
                <Redirect to="/"></Redirect>
              ) : (
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
        </Switch>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
