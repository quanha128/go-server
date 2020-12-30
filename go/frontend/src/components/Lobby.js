import React, { Component } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
import SpectateGame from "./SpectateGame";
import { Grid } from "@material-ui/core";

class GameInLobby extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Link to={`/game/${this.props.info.code}`}>{this.props.info.code}</Link>;
  }
}

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount(){
    fetch("/api/games").then((res) => res.json()).then((data) => {
      console.log("Data: " + data);
      this.setState({
        games: data,
      });
      console.log(this.state.games);
    });
  }
  
  render() {
    const games = this.state.games.slice();
    // can turn into another react component
    let gamesList = games.map((game) => (
      <Grid item xs={12}><GameInLobby key={game.id} id={game.id} info={game}></GameInLobby></Grid>
    ));
    gamesList = (<Grid container spacing={1}>{gamesList}</Grid>);
    return (
      <div>
        {gamesList}
        <Router>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Link to="/create-game">Create game</Link>
            </Grid>
            <Grid item xs={4}>
              <Link to="/join-game">Join game</Link>
            </Grid>
            <Grid item xs={4}>
              <Link to="/spectate-game">Spectate game</Link>
            </Grid>
          </Grid>
          <Switch>
            <Route path="/create-game" render={() => <CreateGame {...this.props} joinGameCallback={(data) => this.props.joinGameCallback(data)}/>}></Route>
            <Route path="/join-game" render={() => <JoinGame {...this.props} joinGameCallback={(data) => this.props.joinGameCallback(data)}/>}></Route>
            <Route path="/spectate-game"><SpectateGame/></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
