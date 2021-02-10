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
            <div className="d-flex flex-column justify-content-center align-items-center ml-2">
                <h3>Keywords</h3>
                <ul className="d-flex flex-column mt-3">
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