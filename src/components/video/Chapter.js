import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button'

// Composant dédié à lister les boutons de chaque chapitre
export class Chapter extends React.Component {

    // Récupération des éléments Chapters du backend et du temps de la vidéo
    static propTypes = {
        items: PropTypes.array.isRequired,
        currentTime: PropTypes.number.isRequired
    };

    // Envoi des éléments du chapitre cliqué
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

// Composant dédié à créer les boutons des chapitres
export class ItemChapter extends React.Component {

    // Récupération des éléments du chapitre et du temps de la vidéo
    static propTypes = {
        elt: PropTypes.object.isRequired,
        currentTime: PropTypes.number.isRequired
    };

    // Evenement onClick sur le bouton pour envoyer les infos
    click = () => {
        this.props.onClick(this.props.elt);
    }

    render() {
        // Gestion du style si le chapitre est avant ou après l'instant présent de la vidéo
        let variant = "dark";
        if(this.props.elt.pos <= this.props.currentTime) {
            variant = "light";
        }

        return (
            <Button className="mb-1" onClick={this.click} variant={variant}>{this.props.elt.title}</Button>
        )
    }
}