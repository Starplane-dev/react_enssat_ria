import react from 'react';
import PropTypes from 'prop-types';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Composant dédié à l'affichage de la carte avec les emplacements marquants
export class Map extends react.Component {

    // Récupération des éléments cartography
    static propTypes = {
        items: PropTypes.array.isRequired,
    };

    // Envoi des informations du marqueur cliqué vers le composant parent (ici Player)
    clickMap(elt) {
        this.props.onClick(elt);
    }

    render() {
        let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        });
        L.Marker.prototype.options.icon = DefaultIcon;
        
        return (
            <div className="d-flex flex-column justify-content-center align-items-center ml-2">
                <h3>Cartography</h3>
                <div className="mt-3">
                    <MapContainer center={[36.123240, -95.814561]} zoom={4} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {this.props.items.map((element, index) => (
                            <Marker 
                                key={index}
                                position={[element.lat, element.lng]}
                                eventHandlers={{
                                    click: () => {this.clickMap(element)},
                                }}
                            >
                                <Popup>
                                    {element.label}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        );
    }
}