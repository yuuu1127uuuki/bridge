import React from 'react';
import {
  APIProvider,
  Map,
  Marker,
} from '@vis.gl/react-google-maps';
import InfoWindowContent from '../Atoms/InfoWindowContent';

const MapConponent = ({ data, selected, onMarkerClick }) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  // const [selected, setSelected] = React.useState(null);

  // const handleMarkerClick = (item) => {
  //   setSelected(item);
  //   if (onMarkerClick) {
  //     onMarkerClick(item);
  //   }
  // };
  const handleMarkerClick = (item) => {
    if (onMarkerClick) {
      onMarkerClick(item);
    }
  };
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 34.2941965, lng: 131.6204442 }}
        defaultZoom={9}
        gestureHandling={'cooperative'}
        disableDefaultUI={true}
      >
        {data.map((item) => {
          const [lat, lng] = item.Id.split(',').map((coord) =>
            parseFloat(coord.trim())
          );
          return (
            <Marker
              key={item._id}
              position={{ lat, lng }}
              onClick={() => handleMarkerClick(item)}
            />
          );
        })}

        {selected && (
          <InfoWindowContent
            selected={selected}
            onClose={() => onMarkerClick(null)}
          />
        )}
      </Map>
    </APIProvider>
  );
};

export default MapConponent;
