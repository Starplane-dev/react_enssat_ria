import React from 'react';

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
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>        
                <label>
                Pseudo:
                <input
                    name="pseudo"
                    type="pseudo"
                    value={this.state.pseudo}
                    onChange={this.setPseudo}
                    required />
                </label>
                
                <label>
                Message:
                <input
                    name="message"
                    type="message"
                    value={this.state.message}
                    onChange={this.setMessage}
                    required />
                </label>
        
                <button>Submit</button>
            </form>
        );
    }
}