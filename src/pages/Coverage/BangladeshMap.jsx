import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import L from 'leaflet';


// Fix leaflet icon issues with Webpack/Vite
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

function FlyToDistrict({ coords }) {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 14, { duration: 1.5 })
    }
    return null
}

const BangladeshMap = ({ serviceCenters, activeCoords }) => {
    const position = [23.6850, 90.3563]; // Bangladesh center

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <MapContainer center={position} zoom={8} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <FlyToDistrict coords={activeCoords} />

                {
                    serviceCenters.map((center, idx) => (
                        <Marker
                            key={idx}
                            position={[center.latitude, center.longitude]}
                            icon={customIcon}>
                            <Popup>
                                <strong>{center.district}</strong> <br /> {center.covered_area.map(area => <div className=''>{area}</div>)}
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    );
};

export default BangladeshMap;
