import React from 'react';
import PropTypes from 'prop-types';

export class Keyword extends React.Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        currentTime: PropTypes.number.isRequired
    };
    
    render() {

        let toPrint = [];
        this.props.items.map((element) => {
            if (this.props.currentTime > element.pos) {
                toPrint.push(element);
            }
        })        

        return (
            <div>
                <h3>Keywords :</h3>
                <p></p>
                <ul>
                    {toPrint.map((element) => (
                        element.data.map((data, index) => (
                            <p key={index}>{data.title} : <a href={data.url}>{data.url}</a></p>
                        ))
                    ))}
                </ul>
            </div>
        );
    }
}