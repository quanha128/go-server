import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Game from "./Game";
import Lobby from "./Lobby";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
    };
  }

  leaveGame(){
    this.setState({
      gameId: "",
    });
  }

  joinGame(gameCode){
    this.setState({
      gameId: gameCode,
    });
    // check if game is still up
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/game/:code" render={(props) => <Game {...props} leaveGameCallback={() => this.leaveGame()}/>}>
          </Route>
          <Route path="/" render={(props) => <Lobby {...props} joinGameCallback={() => this.joinGame()} />}>
          </Route>
        </Switch>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
