import React from 'react';
import { InfoWindow } from '@vis.gl/react-google-maps';

const InfoWindowContent = ({ selected, onClose }) => {
  return (
    <InfoWindow
      position={{
        lat: parseFloat(selected.Id.split(',')[0]),
        lng: parseFloat(selected.Id.split(',')[1]),
      }}
      onCloseClick={onClose}
    >
      <div>
        <h3 style={{ textAlign: 'center' }}>{selected.Name}</h3>
        <div style={{ textAlign: 'left' }}>
          <p>Address: {selected.address}</p>
          <p>Inspector: {selected.Inspector}</p>
          <p>Road: {selected.Road}</p>
          <p>Rank: {selected.Rank}</p>
        </div>
      </div>
    </InfoWindow>
  );
};

export default InfoWindowContent;
