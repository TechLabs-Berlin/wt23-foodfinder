import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api';
import { GetLat, GetLng } from './GetLatLng';
//const ScriptLoaded = require("./ScriptLoaded").default;


const containerStyle = {
  width: '400px',
  height: '400px'
};

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// Maps

function Maps() {
  
 const onLoad = marker => {
    console.log('marker: ', marker)
  }
// example marker position

  const markerPosition = {
    lat: 52.489587,
    lng: 13.485512
  }

  // user's location

  const center = {
    lat: GetLat(),
    lng: GetLng()
  }
    
  return (
    <LoadScript
      googleMapsApiKey=  {googleMapsApiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        { /* Child components, such as markers, info windows, etc. */ }

      <MarkerF
      onLoad={onLoad}
      position={markerPosition}
  />
        
        <></>
      </GoogleMap>
    </LoadScript>
  )
}


export default Maps;

//https://react-google-maps-api-docs.netlify.app/
//npm install --save @react-google-maps/api