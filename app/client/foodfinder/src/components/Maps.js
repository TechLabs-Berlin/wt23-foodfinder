import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 4.5,
  lng: 32
};
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Maps() {
  return (
    <LoadScript
      googleMapsApiKey=  {googleMapsApiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}


export default Maps;

//https://react-google-maps-api-docs.netlify.app/
//npm install --save @react-google-maps/api