import React from 'react';
import {APIProvider, Map, Marker, InfoWindow} from '@vis.gl/react-google-maps';

const MapConponent = ({ data, onMarkerClick, }) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [selected, setSelected] = React.useState(null);

  const handleMarkerClick = (item) => {
    setSelected(item);
    if (onMarkerClick) {
      onMarkerClick(item);
    }
  };
  return(
  <APIProvider apiKey={API_KEY}>
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 34.2941965, lng: 131.6204442}}
      defaultZoom={9}
      gestureHandling={'cooperative'}
      disableDefaultUI={true}
    >
      {data.map((item) => {
        const [lat, lng] = item.Id.split(',').map((coord) => parseFloat(coord.trim()));
        return (
          <Marker
            key={item._id}
            position={{ lat, lng }}
            onClick={() => handleMarkerClick(item)}
          />
        );
      })}

      {selected && (
        <InfoWindow
          position={{
            lat: parseFloat(selected.Id.split(',')[0]),
            lng: parseFloat(selected.Id.split(',')[1]),
          }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h3>{selected.Name}</h3>
            <p>Address: {selected.address}</p>
            <p>Inspector: {selected.Inspector}</p>
            <p>Road: {selected.Road}</p>
            <p>Rank: {selected.Rank}</p>
          </div>
        </InfoWindow>
      )}
    </Map>
  </APIProvider>
  );
};

export default MapConponent;
