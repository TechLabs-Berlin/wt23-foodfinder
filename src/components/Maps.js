import { useEffect, useCallback, useState } from 'react'
import { GoogleMap, MarkerF, CircleF } from '@react-google-maps/api'
import { getCoordinates } from '../utils/geolocation'
import StoreInfoScreen from './StoreInfoScreen'
import MaxDistanceSelector from './MaxDistanceSelector'
import UserFeedbackScreen from './UserFeedbackScreen'

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const containerStyle = {
    width: '100%',
    height: '400px',
}

const icons = {
    user: {
        icon: require('../images/icon_marker_user.png'),
    },
    green: {
        icon: require('../images/icon_marker_green.png'),
    },
    orange: {
        icon: require('../images/icon_marker_orange.png'),
    },
    red: {
        icon: require('../images/icon_marker_red.png'),
    },
    white: {
        icon: require('../images/icon_marker_white.png'),
    },
}

export default function Maps({ page, product_id, product_name }) {
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
    const [stores, setStores] = useState([])
    const [maxDistance, setMaxDistance] = useState(2)

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

    const [markerInfo, setMarkerInfo] = useState(null)
    const showOverlayScreen = (store_name, store_id, product_quantity) => {
        setMarkerInfo({ store_name, store_id, product_quantity })
    }

    // to open/close overlay screens
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const pull_data = data => {
        if (data === false) {
            setIsOverlayOpen(false)
        }
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
            getStoreData(data.coords.latitude, data.coords.longitude)
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

    // fetch data for Stores tab - no product selected
    async function getStoreData(latitude, longitude) {
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
    async function getStoreDataProduct(latitude, longitude, product_id) {
        const response = await fetch(
            `https://foodfinderapi.herokuapp.com/stores-with-products/?lat=${latitude}&lng=${longitude}&radius=${maxDistance}&product_code=${product_id}&product_name=${product_name}`,
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
                mapContainerStyle={containerStyle}
                center={coordinates}
                zoom={13.5 - maxDistance * 0.5}
            >
                {/*showing the user's location*/}
                <MarkerF icon={icons.user.icon} position={coordinates} />
                {/*showing locations of stores*/}
                {stores.map(
                    ({ store_id, store_name, position, product_quantity }) => {
                        let icon = icons.white.icon
                        if (product_quantity >= 10) {
                            icon = icons.green.icon
                        } else if (product_quantity >= 5) {
                            icon = icons.orange.icon
                        } else if (
                            product_quantity !== null &&
                            product_quantity >= 0
                        ) {
                            icon = icons.red.icon
                        }
                        return (
                            <MarkerF
                                icon={icon}
                                key={store_id}
                                position={position}
                                onClick={() => {
                                    showOverlayScreen(store_name, store_id)
                                    setIsOverlayOpen(true)
                                }}
                            />
                        )
                    },
                )}
                <CircleF center={coordinates} options={mapCircleOptions} />
            </GoogleMap>
            <MaxDistanceSelector onChange={setMaxDistance} />
            {/*showing StoreInfoScreen or UserFeedbackScreen after clicking at markers*/}
            {isOverlayOpen && page === 'Stores' && (
                <div>
                    <StoreInfoScreen
                        store_name={markerInfo.store_name}
                        store_id={markerInfo.store_id}
                        func={pull_data}
                    />
                </div>
            )}
            {isOverlayOpen && page === 'SelectedProduct' && (
                <div>
                    <UserFeedbackScreen
                        store_name={markerInfo.store_name}
                        product_id={product_id}
                        store_id={markerInfo.store_id}
                        func={pull_data}
                    />
                </div>
            )}
        </>
    )
}
