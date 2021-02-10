import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button'

export class Chapter extends React.Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        currentTime: PropTypes.number.isRequired
    };

    handleClick(param) {
        this.props.onClick(param);
    }

    render() {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3>Chapters</h3>
                <ul className="d-flex flex-column mt-3">
                    {this.props.items.map((element, index) => (
                        <ItemChapter 
                            key = {index}
                            elt = {element}
                            onClick = {this.handleClick.bind(this)}
                            currentTime = {this.props.currentTime}/>
                    ))}
                </ul>
            </div>
        );
    }
}

export class ItemChapter extends React.Component {

    static propTypes = {
        elt: PropTypes.object.isRequired,
        currentTime: PropTypes.number.isRequired
    };

    click = () => {
        this.props.onClick(this.props.elt);
    }

    render() {
        let variant = "dark";
        if(this.props.elt.pos <= this.props.currentTime) {
            variant = "light";
        }

        return (
            <Button className="mb-1" onClick={this.click} variant={variant}>{this.props.elt.title}</Button>
        )
    }
}