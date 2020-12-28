import { extend } from "lodash";
import React, { Component } from "react";

function ChatLine(props){
    return (
        <div>
            From {props.sender}: {props.message}
        </div>
    )
}

export default class ChatLog extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatLog: [{
                'sender': 'Thanh',
                'message': 'Hello world',
            }, {
                'sender': 'Thang',
                'message': 'Bye world',
            }]
        }
    }

    componentDidMount() {
        // get all the chat corresponding to the room
        // get the chat id
    }

    render() {
        const chatLogComp = this.state.chatLog.map((chatObj) => <ChatLine 
            sender={chatObj.sender} 
            message={chatObj.message}></ChatLine>);
        
        return (<div>{chatLogComp}</div>);
    }

} 