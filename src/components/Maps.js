import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
//const ScriptLoaded = require("../../docs/ScriptLoaded").default;


const containerStyle = {
  width: '400px',
  height: '400px'
};

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// example marker position

const markerPosition = {
  lat: 52.489587,
  lng: 13.485512
}

const markerPosition2 = {
  lat: 52.490766,
  lng: 13.483752
}

const onLoad = marker => {
  console.log('marker: ', marker)
}

// class component Maps

class Maps extends React.Component {
  
  constructor(props){
    super(props);

    this.state = { lng: null, lat: null };
}

// get user's location
    componentDidMount(){
      
      window.navigator.geolocation.getCurrentPosition(
          (position) => this.setState({lat: position.coords.latitude, lng:position.coords.longitude}),

      );        
    }
    render () {
  return (
    <LoadScript
      googleMapsApiKey=  {googleMapsApiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={this.state}
        zoom={14}
      >
        { /* Child components, such as markers, info windows, etc. */ }

      <Marker
      onLoad={onLoad}
      position={markerPosition}
  />

<Marker
      onLoad={onLoad}
      position={markerPosition2}
  />
        
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
}


export default Maps;

//https://react-google-maps-api-docs.netlify.app/
//npm install --save @react-google-maps/api