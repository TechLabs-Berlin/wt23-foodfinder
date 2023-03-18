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

/*const stores = [
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
]; */

export default function Maps() {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [stores, setStores] = useState([]);

  async function getAllStoreData() {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/foodfinderapi.herokuapp.com:443/all-stores"
      //https://cors-anywhere.herokuapp.com/
    );
    const data = await response.json();
    const stores = data.map((store) => ({
      store_id: store.store_id,
      store_name: store.store_name,
      position: { lat: store.latitude, lng: store.longitude },
    }));
    setStores(stores);
    console.log(stores);
  }

  const fetchCoordinates = useCallback(async () => {
    const data = await getCoordinates();
    setCoordinates({ lat: data.coords.latitude, lng: data.coords.longitude });
  }, []);

  useEffect(() => {
    fetchCoordinates();
    getAllStoreData();
  }, [fetchCoordinates]);

  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const [markerInfo, setMarkerInfo] = useState(null);

  const showUserFeedbackScreen = (store_name, lat, lng) => {
    setMarkerInfo({ store_name, lat, lng });
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={13}
      >
        {stores.map(({ store_id, store_name, position }) => (
          <MarkerF
            key={store_id}
            position={position}
            onClick={() => {
              handleActiveMarker(store_id);
              showUserFeedbackScreen(store_name, position.lat, position.lng);
            }}
          />
        ))}
        <CircleF center={coordinates} options={options} />
      </GoogleMap>
      {markerInfo && (
        <div>
          <UserFeedbackScreen name={markerInfo.store_name} />
        </div>
      )}
    </LoadScript>
  );
}
