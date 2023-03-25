import Maps from '../components/Maps'
// import ProductItem from "../components/ProductItem";

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
//import { useState } from 'react'

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

const Stores = () => {
    /* const selectedProduct = {
        product_name: 'Selected product name',
        brands: 'Selected Brand',
        quantity: '4',
    } */

    // const { stores } = useStoreFromAPI(maxDistance);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Stores</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* <ProductItem
          product={selectedProduct}
          onClick={() => {
            console.log("Selected item clicked");
          }}
        />{" "} */}
                {/*console.log can be substituted with a different function */}
                {/* MAPS */}
                <Maps page='Stores' />
            </IonContent>
        </IonPage>
    )
}

export default Stores
