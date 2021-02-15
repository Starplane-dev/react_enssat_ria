import React from 'react';
import PropTypes from 'prop-types';

import ListGroup from 'react-bootstrap/ListGroup';

import { ChatPost } from './ChatPost';

// Composant dédié à l'affichage du chat
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

    // Initialisation de la connexion websocket une fois le rendering fait
    componentDidMount() {
        const ws = new WebSocket("wss://imr3-react.herokuapp.com")
        
        ws.onopen = () => {
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
            this.setState({
                connected: false,
                ws: new WebSocket("wss://imr3-react.herokuapp.com")
            });
        };
    }

    // Si message envoyé par un autre utilisateur : récupération et ajout à la liste à afficher
    readMessage(message) {
        this.setState(state => ({ messages: [message, ...state.messages]}))
    }

    // Envoi de notre message au websocket
    writeMessage(message) {
        this.state.ws.send(JSON.stringify(message));
    }
    
    render() {
        return (
            <div className="ml-2 chat">
                <ListGroup variant="flush">
                    {this.state.messages.map((message, index) =>
                        <ListGroup.Item key={index}>
                            <span className="text-muted date">{new Date(message.when).toLocaleTimeString()} </span><br />
                            <span className="font-weight-bold">{message.name} : </span>
                            <span>{message.message}</span>
                        </ListGroup.Item>
                    )}
                </ListGroup>
                <ChatPost 
                    onMessage={this.writeMessage.bind(this)}
                />
            </div>
        );
    }
}