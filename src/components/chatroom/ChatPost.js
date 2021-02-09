import React from 'react';

export class ChatPost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            message: '',
            when: '',
            moment: 0
        };
    }

    submit(event) {
        console.log(this.state);
        if (this.state.name === "") {
            this.setState({
                name: event.target.value,
            });
        } else {
            this.setState({
                message: event.target.value,
                when: Math.floor(Date.now() / 1000),
                moment: 0
            });
        }
    }

    render() {
        return(
            <form onSubmit={this.submit}>
                <label>
                    test :
                    <input type="text" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}