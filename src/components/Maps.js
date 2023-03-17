import { useEffect, useCallback, useState } from "react";
import {
  GoogleMap,
  //InfoWindow,
  MarkerF,
  LoadScript,
  CircleF,
} from "@react-google-maps/api";
import { getCoordinates } from "../utils/geolocation";
import UserFeedbackScreen from "./UserFeedbackScreen";

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const options = {
  strokeColor: "##7FFFD4",
  strokeOpacity: 0.8,
  strokeWeight: 0.5,
  fillColor: "#7FFFD4",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 2000,
  zIndex: 1,
};

const stores = [
  //to be replaced with API with stores
  {
    id: 1,
    name: "Store 1",
    position: { lat: 52.50403855047262, lng: 13.473260454116632 },
  },
  {
    id: 2,
    name: "Store 2",
    position: { lat: 52.514235, lng: 13.48325 },
  },
  {
    id: 3,
    name: "Store 3",
    position: { lat: 52.509235, lng: 13.48683 },
  },
  {
    id: 4,
    name: "Store 4",
    position: { lat: 52.49776, lng: 13.465974 },
  },
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

  /*const infoWindowOnLoad = (infoWindow) => {
    console.log("infoWindow: ", infoWindow);
  }; */

  const [markerInfo, setMarkerInfo] = useState(null);

  const showUserFeedbackScreen = (name, lat, lng) => {
    setMarkerInfo({ name, lat, lng });
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={13}
      >
        {" "}
        {/*onClick - turns off infowindows when the map is clicked */}
        {stores.map(({ id, name, position }) => (
          <MarkerF
            key={id}
            position={position}
            onClick={() => {
              handleActiveMarker(id);
              showUserFeedbackScreen(name, position.lat, position.lng);
            }}
          >
            {/*     {activeMarker === id ? (
  <InfoWindow onLoad={infoWindowOnLoad}>
    <div>
      {name}
    </div>
  </InfoWindow>
     ) : null} */}
          </MarkerF>
        ))}
        <CircleF center={coordinates} options={options} />
      </GoogleMap>
      {markerInfo && (
        <div>
          <UserFeedbackScreen name={markerInfo.name} />
        </div>
      )}
    </LoadScript>
  );
}
