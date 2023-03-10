import React, { useEffect, useCallback, useState } from "react";
import { GoogleMap, InfoWindow, MarkerF, LoadScript, CircleF } from "@react-google-maps/api";
import { getCoordinates } from "../utils/geolocation";

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const options = {
  strokeColor: '##7FFFD4',
  strokeOpacity: 0.8,
  strokeWeight: 0.5,
  fillColor: '#7FFFD4',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 1000,
  zIndex: 1
}


const stores = [ //to be replaced with API with stores
  {
    id: 1,
    name: "Store 1",
    position: { lat: 52.881832, lng: 13.623177 }
  },
  {
    id: 2,
    name: "Store 2",
    position: { lat: 52.739235, lng: 13.99025 }
  },
  {
    id: 3,
    name: "Store 3",
    position: { lat: 52.052235, lng: 13.243683 }
  },
  {
    id: 4,
    name: "Store 4",
    position: { lat: 52.712776, lng: 13.005974 }
  }
];

export default function Maps() {

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const fetchCoordinates = useCallback(async () => {
    const data = await getCoordinates();
    setCoordinates({ lat: data.coords.latitude, lng: data.coords.longitude });
  }, []);

  useEffect(() => {
    fetchCoordinates();
  }, [fetchCoordinates]);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const infoWindowOnLoad = infoWindow => {
    console.log('infoWindow: ', infoWindow)
  }

  return (
    <LoadScript googleMapsApiKey= {googleMapsApiKey}>
    <GoogleMap onClick={() => setActiveMarker(null)} mapContainerStyle={containerStyle} center = {coordinates} zoom ={14}> {/*onClick - turns off infowindows when the map is clicked */}
      {stores.map(({ id, name, position }) => (
        <MarkerF key={id} position={position} onClick={() => handleActiveMarker(id)}>
          {activeMarker === id ? (
            <InfoWindow onLoad = {infoWindowOnLoad}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </MarkerF>
      ))}
     <CircleF center ={coordinates} options = {options}/>
    </GoogleMap>
    </LoadScript>
  );
}