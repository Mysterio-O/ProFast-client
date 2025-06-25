import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import L from 'leaflet';


// Fix leaflet icon issues with Webpack/Vite
const customIcon = new L.Icon({
    iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize:[25,41],
    iconAnchor:[12,41]
})

const BangladeshMap = () => {
    const position = [23.6850, 90.3563]; // Bangladesh center

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <MapContainer center={position} zoom={7} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        Bangladesh <br /> We deliver to all 64 districts!
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default BangladeshMap;
