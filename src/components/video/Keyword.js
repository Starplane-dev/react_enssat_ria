import React from 'react';
import PropTypes from 'prop-types';

// Composant dédié à la liste des mots clés de la vidéo
export class Keyword extends React.Component {

    // Récupération des mots clés provenant du backend avec le temps de la vidéo
    static propTypes = {
        items: PropTypes.array.isRequired,
        currentTime: PropTypes.number.isRequired
    };
    
    render() {

        // On compare le temps de la vidéo avec le temps du mots clé
        let toPrint = [];
        this.props.items.map((element) => {
            if (this.props.currentTime > element.pos) { // On affiche le mot clé que si l'evènement est passé dans la vidéo
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