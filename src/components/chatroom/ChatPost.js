import React from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// Composant dédié à la récupération du pseudo et du message de l'utilisateur
export class ChatPost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            message: "",
            when: null,
            moment: null,
            isPseudo: false
        }

        this.setPseudo = this.setPseudo.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Appelée à chaque modification dans le <input> dédié au pseudo
    setPseudo = (event) => {
        this.setState({name: event.target.value});
    }

    // Appelée à chaque modification dans le <input> dédié au message
    setMessage = (event) => {
        this.setState(
            {
                message: event.target.value,
                when: Math.floor(Date.now() / 1000),
                moment: 0
            });
    }

    // Envoi du pseudo et message
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onMessage(this.state);
        this.setState({
            isPseudo: true,
            message: ''
        });
    }

    render() {
        if (this.state.isPseudo) {
            return (
                <form className="d-flex flex-column justify-content-center mt-3" onSubmit={this.handleSubmit}>        
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control 
                            type="text" 
                            name="message" 
                            placeholder="Message"
                            value={this.state.message}
                            onChange={this.setMessage}
                            required />
                    </Form.Group>
                    <Button variant="secondary" type="submit">Submit</Button>
                </form>
            );
        } else {
            return (
                <form className="d-flex flex-column justify-content-center mt-3" onSubmit={this.handleSubmit}>        
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control 
                            type="text" 
                            name="pseudo" 
                            placeholder="Pseudo"
                            value={this.state.pseudo}
                            onChange={this.setPseudo}
                            required />

                        <Form.Control 
                            type="message" 
                            name="message" 
                            placeholder="Message"
                            value={this.state.message}
                            onChange={this.setMessage}
                            required />
                    </Form.Group>
                    <Button variant="secondary" type="submit">Submit</Button>
                </form>
            );
        }
    }
}