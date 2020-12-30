import React, { Component } from "react";
import {
  Grid,
  Input,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Checkbox,
  FormGroup,
  Button,
} from "@material-ui/core";

export default class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      havePassword: false,
      roomName: "",
    };
  }

  changePasswordOption() {
    this.setState({
      havePassword: this.state.havePassword == false ? true : false,
    });
  }

  /* make sure event has 'name' and 'value' field */
  changeInputField(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  joinGameButtonPressed(){
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        game_name: this.state.gameName,
        code: this.state.gameCode,
        password: this.state.password,
        can_spectate: true,
      }),
    };
    console.log(requestOptions);
    fetch("/api/join-game", requestOptions).then((res) => res.json()).then((data) => {
      this.props.history.push(`/game/${data.code}`);
      this.props.joinGameCallback(data);
    })
  }

  render() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} align="left">
          Join game
        </Grid>
        <Grid item xs={12} align="left">
          <FormControl component="fieldset">
            <InputLabel>Room name</InputLabel>
            <Input
              placeholder="Type your game name"
              required
              name="gameName"
              onChange={(e) => this.changeInputField(e)}
            ></Input>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="left">
          <FormControl component="fieldset">
            <InputLabel>Game code</InputLabel>
            <Input
              placeholder="Type your game code"
              required
              name="gameCode"
              onChange={(e) => this.changeInputField(e)}
            ></Input>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="left">
          <Checkbox
            value="havePassword"
            checked={this.state.havePassword}
            onClick={() => this.changePasswordOption()}
          />
          <FormControl component="fieldset">
            <FormLabel label="Password" />
            <Input
              placeholder="Password"
              disabled={!(this.state.havePassword)}
              name="password" 
              onChange={(e) => this.changeInputField(e)}
            ></Input>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" onClick={() => this.joinGameButtonPressed()}>
            Join game
          </Button>
        </Grid>
      </Grid>
    );
  }
}
