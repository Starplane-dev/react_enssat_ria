import react from 'react';
import PropTypes from 'prop-types';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Composant dédié à l'affichage de la carte avec les emplacements marquants
export class Map extends react.Component {

    // Récupération des éléments cartography
    static propTypes = {
        items: PropTypes.array.isRequired,
        currentTime: PropTypes.number.isRequired
    };

    // Envoi des informations du marqueur cliqué vers le composant parent (ici Player)
    clickMap(elt) {
        this.props.onClick(elt);
    }

    render() {

        let markerToPrint = [];
        let markerToRoad = [];
        this.props.items.map((element) => {
            if (this.props.currentTime > element.timestamp) { // On affiche le mot clé que si l'evènement est passé dans la vidéo
                markerToPrint.push(element);
                markerToRoad.push([element.lat, element.lng]);
            }
        }) 

        let DefaultIcon = L.icon({
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
            iconUrl: icon,
            shadowUrl: iconShadow
        });
        L.Marker.prototype.options.icon = DefaultIcon;
        
        return (
            <div className="d-flex flex-column justify-content-center align-items-center ml-2">
                <h3>Cartography</h3>
                <div className="mt-3">
                    <MapContainer center={[36.123240, -95.814561]} dragging={false} zoom={4} zoomControl={false} scrollWheelZoom={false} doubleClickZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markerToPrint.map((element, index) => (
                            <Marker 
                                key={index}
                                position={[element.lat, element.lng]}
                                eventHandlers={{
                                    dblclick: () => {this.clickMap(element)},
                                }}
                            >
                                <Popup>
                                    {element.label}
                                </Popup>
                            </Marker>
                        ))}
                        <Polyline positions={markerToRoad}/>
                    </MapContainer>
                </div>
            </div>
        );
    }
}