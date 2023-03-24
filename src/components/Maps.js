import { useEffect, useCallback, useState } from 'react'
import { GoogleMap, MarkerF, LoadScript, CircleF } from '@react-google-maps/api'
import { getCoordinates } from '../utils/geolocation'
import UserFeedbackScreen from './UserFeedbackScreen'
import MaxDistanceSelector from '../components/MaxDistanceSelector'

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const containerStyle = {
    width: '100%',
    height: '400px',
}

// custom icons for markers that show availability with colors
const icons = {
    green: {
        icon: 'http://maps.google.com/mapfiles/kml/paddle/grn-circle.png',
    },
    yellow: {
        icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png',
    },
    red: {
        icon: 'http://maps.google.com/mapfiles/kml/paddle/stop.png',
    },
    white: {
        icon: 'http://maps.google.com/mapfiles/kml/paddle/wht-circle.png',
    },
}

export default function Maps() {
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
    const [stores, setStores] = useState([])
    const [maxDistance, setMaxDistance] = useState(2)
    console.log('maxDistance', maxDistance)

    const options = {
        strokeColor: '##7FFFD4',
        strokeOpacity: 0,
        strokeWeight: 0.5,
        fillColor: '#7FFFD4',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: maxDistance * 1000,
        zIndex: 1,
    }

    const fetchCoordinates = useCallback(async () => {
        const data = await getCoordinates()
        setCoordinates({
            lat: data.coords.latitude,
            lng: data.coords.longitude,
        })

        // call getStoreData() after the coordinates are fetched
        getStoreData(data.coords.latitude, data.coords.longitude)
    })

    useEffect(() => {
        fetchCoordinates()
    }, [maxDistance])

    useEffect(() => {
        // call getStoreData() every time the coordinates or maxDistance change
        getStoreData(coordinates.lat, coordinates.lng) //passing coordinates as arguments of the
    }, [coordinates, maxDistance])

    const [activeMarker, setActiveMarker] = useState(null)
    const handleActiveMarker = marker => {
        if (marker === activeMarker) {
            return
        }
        setActiveMarker(marker)
    }

    const [markerInfo, setMarkerInfo] = useState(null)

    const showUserFeedbackScreen = (store_name, lat, lng) => {
        setMarkerInfo({ store_name, lat, lng })
    }

    async function getStoreData(latitude, longitude) {
        const response = await fetch(
            `https://foodfinderapi.herokuapp.com/stores/?lat=${latitude}&lng=${longitude}&radius=${maxDistance}`,
            {
                method: 'GET',
            },
        )
        // `https://cors-anywhere.herokuapp.com/foodfinderapi.herokuapp.com:443/stores/?lat=52.52000&lng=13.404954&radius=${maxDistance}` //lat lng for testing
        const data = await response.json()
        const stores = data.map(store => ({
            store_id: store.store_id,
            store_name: store.store_name,
            position: { lat: store.latitude, lng: store.longitude },
        }))
        setStores(stores)
        console.log(stores)
    }

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
                        icon={icons.green.icon}
                        key={store_id}
                        position={position}
                        onClick={() => {
                            handleActiveMarker(store_id)
                            showUserFeedbackScreen(
                                store_name,
                                position.lat,
                                position.lng,
                            )
                        }}
                    />
                ))}
                <CircleF center={coordinates} options={options} />
            </GoogleMap>
            <MaxDistanceSelector onChange={setMaxDistance} />
            {markerInfo && (
                <div>
                    <UserFeedbackScreen name={markerInfo.store_name} />
                </div>
            )}
        </LoadScript>
    )
}
