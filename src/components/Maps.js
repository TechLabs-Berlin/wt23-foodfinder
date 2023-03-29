import { useEffect, useCallback, useState } from 'react'
import { GoogleMap, MarkerF, CircleF } from '@react-google-maps/api'
import { getCoordinates } from '../utils/geolocation'
import StoreInfo from './StoreInfoScreen'
import MaxDistanceSelector from '../components/MaxDistanceSelector'
import UserFeedbackScreen from './UserFeedbackScreen'

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const containerStyle = {
    width: '100%',
    height: '400px',
}

const icons = {
    user: {
        icon: 'http://maps.google.com/mapfiles/kml/pal2/icon18.png',
    },
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

export default function Maps({ page, product_id, product_name }) {
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
    const [stores, setStores] = useState([])
    const [maxDistance, setMaxDistance] = useState(2)
    console.log('maxDistance', maxDistance)
    console.log(product_id)

    const mapCircleOptions = {
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

    const fetchLocations = useCallback(async () => {
        //fetching the user's coordinates
        const data = await getCoordinates()
        setCoordinates({
            lat: data.coords.latitude,
            lng: data.coords.longitude,
        })
        // call getStoreData() after the coordinates are fetched
        if (page === 'Stores') {
            getStoreDataStores(data.coords.latitude, data.coords.longitude)
        } else if (page === 'SelectedProduct') {
            getStoreDataProduct(
                data.coords.latitude,
                data.coords.longitude,
                product_id,
            )
        } else {
            console.log('Error')
        }
    })
    //re-render every time maxDistance changes
    useEffect(() => {
        fetchLocations()
    }, [maxDistance])

    const [activeMarker, setActiveMarker] = useState(null)
    const handleActiveMarker = marker => {
        if (marker === activeMarker) {
            return
        }
        setActiveMarker(marker)
    }

    const [markerInfo, setMarkerInfo] = useState(null)

    const showUserFeedbackScreen = (
        store_name,
        store_id,
        lat,
        lng,
        product_quantity,
    ) => {
        setMarkerInfo({ store_name, store_id, lat, lng, product_quantity })
    }
    // fetch data for Stores tab - no product selected
    async function getStoreDataStores(latitude, longitude) {
        const response = await fetch(
            `https://foodfinderapi.herokuapp.com/stores/?lat=${latitude}&lng=${longitude}&radius=${maxDistance}`,
            {
                method: 'GET',
            },
        )
        const data = await response.json()
        const stores = data.map(store => ({
            store_id: store.store_id,
            store_name: store.store_name,
            position: { lat: store.latitude, lng: store.longitude },
        }))
        setStores(stores)
        console.log(stores)
    }
    // fetch data for SelectedProduct
    async function getStoreDataProduct(
        latitude,
        longitude,
        product_id,
        //   product_name,
    ) {
        const response = await fetch(
            // `https://foodfinderapi.herokuapp.com/stores/?lat=${latitude}&lng=${longitude}&radius=${maxDistance}`,
            // `https://foodfinderapi.herokuapp.com/stores-with-products/?lat=52.50475601808786&lng=13.471279981799237&radius=${maxDistance}&product_code=${product_id}&product_name=${null}`,
            `https://foodfinderapi.herokuapp.com/stores-with-products/?lat=52.520008&lng=13.404954&radius=100&product_code=${product_id}&product_name=${product_name}`, //link for
            {
                method: 'GET',
            },
        )
        const data = await response.json()
        const stores = data.map(store => {
            //accessing an array in the database
            const productQuantity = store.products.reduce(
                (acc, cur) => acc + cur.quantity,
                null, //set null as an initial value in case there's no product quantity data
            )
            return {
                store_id: store.store_id,
                store_name: store.store_name,
                product_quantity: productQuantity,
                position: { lat: store.latitude, lng: store.longitude },
            }
        })
        setStores(stores)
        console.log(stores)
    }

    return (
        <>
            <GoogleMap
                onClick={() => setActiveMarker(null)}
                mapContainerStyle={containerStyle}
                center={coordinates}
                zoom={13}
            >
                {/*showing the user's location*/}
                <MarkerF icon={icons.user.icon} position={coordinates} />
                {/*showing locations of stores*/}
                {stores.map(
                    ({ store_id, store_name, position, product_quantity }) => {
                        let icon = icons.white.icon
                        if (product_quantity >= 5) {
                            icon = icons.green.icon
                        } else if (product_quantity >= 0.5) {
                            icon = icons.yellow.icon
                        } else if (product_quantity !== null) {
                            icon = icons.red.icon
                        }
                        return (
                            <MarkerF
                                icon={icon}
                                key={store_id}
                                position={position}
                                onClick={() => {
                                    handleActiveMarker(store_id)
                                    showUserFeedbackScreen(
                                        store_name,
                                        store_id,
                                        position.lat,
                                        position.lng,
                                    )
                                }}
                            />
                        )
                    },
                )}
                <CircleF center={coordinates} options={mapCircleOptions} />
            </GoogleMap>
            <MaxDistanceSelector onChange={setMaxDistance} />
            {/*showing StoreInfor or UserFeedbackScreen after clicking at markers*/}
            {markerInfo && page === 'Stores' && (
                <div>
                    <StoreInfo name={markerInfo.store_name} />
                </div>
            )}
            {markerInfo && page === 'SelectedProduct' && (
                <div>
                    <UserFeedbackScreen
                        name={markerInfo.store_name}
                        product_id={product_id}
                        store_id={markerInfo.store_id}
                    />
                </div>
            )}
        </>
    )
}
