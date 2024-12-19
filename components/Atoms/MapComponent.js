import React from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
console.log('API_KEY:', API_KEY);

const MapConponent = () => (
  <APIProvider apiKey={API_KEY}>
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 34.2941965, lng: 131.6204442}}
      defaultZoom={9}
      gestureHandling={'cooperative'}
      disableDefaultUI={true}
    />
  </APIProvider>
);

export default MapConponent;