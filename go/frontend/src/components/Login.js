import React, { Component } from "react";
import { getCookie } from "../helper";

import {
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Grid,
  Button,
  FormHelperText,
} from "@material-ui/core";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  changeInputField(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  login() {
    const csrftoken = getCookie("csrftoken");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    fetch("/rest-auth/login/", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if(data.error){
            // bla bla
        } else{
            this.props.onLogin(data.key);
            this.props.history.push("/");
        }
      });
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
            name="username"
              id="username"
              onChange={(e) => this.changeInputField(e)}
            ></Input>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
            name="password"
              id="password"
              type="password"
              onChange={(e) => this.changeInputField(e)}
            ></Input>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="container"
            onClick={() => this.login()}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
  }
}
