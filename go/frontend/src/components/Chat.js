import {
  FormControl,
  TextField,
  Input,
  InputLabel,
  FormHelperText,
  Grid,
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

  componentDidMount() {
    // get all the chat corresponding to the room
    // get the chat id
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
  }

  render() {
    return (
      <div className={ultilities.topBottomContainer}>
        <ChatLog chatLog={this.props.chatLog} />
        <div className={ultilities.bottomElement}>
          <FormControl>
            <TextField label="Message"></TextField>
            <FormHelperText id="my-helper-text">
              Type your message here.
            </FormHelperText>
          </FormControl>
        </div>
      </div>
    );
  }
}
