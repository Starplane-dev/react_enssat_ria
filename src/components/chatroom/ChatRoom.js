import React from 'react';
import PropTypes from 'prop-types';

import ListGroup from 'react-bootstrap/ListGroup';

import { ChatPost } from './ChatPost';

export class ChatRoom extends React.Component {

    static propTypes = {
        currentTime: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            ws: null,
            messages: []
        }
    }

    componentDidMount() {
        const ws = new WebSocket("wss://imr3-react.herokuapp.com")
        
        ws.onopen = () => {
            console.log("connected");
            this.setState({
                connected: true,
                ws: ws
            });
        };

        ws.onmessage = evt => {
            const messages = JSON.parse(evt.data);
            messages.map(message => this.readMessage(message));
        };
        
        ws.onclose = () => {
            console.log("disconnected, reconnect.");
            this.setState({
                connected: false,
                ws: new WebSocket("wss://imr3-react.herokuapp.com")
            });
        };
    }

    readMessage(message) {
        this.setState(state => ({ messages: [message, ...state.messages]}))
    }

    writeMessage(message) {
        this.state.ws.send(JSON.stringify(message));
    }
    
    render() {
        return (
            <div className="ml-2">
                <ListGroup variant="flush">
                    {this.state.messages.map((message, index) =>
                        <ListGroup.Item key={index}> 
                            <span className="text-muted">{new Date(message.when).toLocaleTimeString()} </span>
                            <span className="font-weight-bold">{message.name}</span> : {message.message}</ListGroup.Item>
                    )}
                </ListGroup>
                <ChatPost 
                    onMessage={this.writeMessage.bind(this)}
                />
            </div>
        );
    }
}