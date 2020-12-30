import {
  FormControl,
  TextField,
  Input,
  InputLabel,
  FormHelperText,
  Grid,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import { extend } from "lodash";
import ultilities from "../../static/css/ultilities.module.css";

function ChatLine(props) {
  return (
    <div>
      From {props.sender}: {props.message}
    </div>
  );
}

class ChatLog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const chatLogComp = this.props.chatLog.map((chatObj) => (
      <ChatLine sender={chatObj.sender} message={chatObj.message}></ChatLine>
    ));

    return (
      <div className={ultilities.hiddenScroll}>
        <div className={ultilities.scrollable}>{chatLogComp}</div>
      </div>
    );
  }
}

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    }
  }

  onTypeMessage(event){
    console.log(event.target.value);
    this.setState({
      'message': event.target.value,
    })
  }

  onSendingMessage(){
      this.setState({message: ""});
      this.props.onSendingMessage(this.state.message);
  }

  onKeyDown(e){
    console.log(e.keyCode);
    if(e.keyCode == 13) // if ENTER key is pressed
      this.onSendingMessage();
  }

  render() {
    return (
      <div className={ultilities.topBottomContainer}>
        <ChatLog chatLog={this.props.chatLog} />
        <div className={ultilities.bottomElement}>
          <FormControl>
            <TextField label="Message" value={this.state.message} onKeyDown={(e) => this.onKeyDown(e)} onChange={(e) => this.onTypeMessage(e)}></TextField>
            <FormHelperText id="my-helper-text">
              Type your message here.
            </FormHelperText>
          </FormControl>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => this.onSendingMessage()}
          >
            Sned game
          </Button>
        </div>
      </div>
    );
  }
}
