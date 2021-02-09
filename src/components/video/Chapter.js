import React from 'react';
import PropTypes from 'prop-types';

export class Chapter extends React.Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
    };

    handleClick(param) {
        this.props.onClick(param);
    }

    render() {
        return (
            <div>
                <h3>Chapters :</h3>
                <ul>
                    {this.props.items.map((element, index) => (
                        <ItemChapter 
                            key = {index}
                            elt = {element}
                            onClick = {this.handleClick.bind(this)}/>
                    ))}
                </ul>
            </div>
        );
    }
}

export class ItemChapter extends React.Component {

    static propTypes = {
        elt: PropTypes.object.isRequired,
    };

    click = () => {
        this.props.onClick(this.props.elt);
    }

    render() {
        return (
            <button onClick={this.click}>{this.props.elt.title}</button>
        )
    }

}