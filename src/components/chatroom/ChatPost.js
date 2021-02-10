import React from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class ChatPost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            message: "",
            when: null,
            moment: null
        }

        this.setPseudo = this.setPseudo.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setPseudo = (event) => {
        this.setState({name: event.target.value});
    }

    setMessage = (event) => {
        this.setState(
            {
                message: event.target.value,
                when: Math.floor(Date.now() / 1000),
                moment: 0
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onMessage(this.state);
    }

    render() {
        return (
            <form className="d-flex flex-column justify-content-center mt-3" onSubmit={this.handleSubmit}>        
                <Form.Group controlId="formBasicEmail">
                    <Form.Control 
                        type="pseudo" 
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