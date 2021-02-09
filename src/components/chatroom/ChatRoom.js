import React from 'react';
import { ChatPost } from './ChatPost';

export class ChatRoom extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            ws: null,
            listMessages: []
        }
    }

    componentDidMount() {
        console.log("EQRFOIESFH EIFH IES")
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
                ws: null
            });
        };
    }


    readMessage(message) {
        console.log(message);
    }

    writeMessage(message) {
        this.state.ws.send(JSON.stringify(message));
    }
    

    render() {
        return (
            <div>
                <h6>Je suis là</h6>
                <ChatPost 
                    onMessage={this.writeMessage.bind(this)}
                />
            </div>
        );
    }

}