import Maps from "../components/Maps";
//import MaxDistanceSelector from "../components/MaxDistanceSelector";
import ProductItem from "../components/ProductItem";

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
//import { useState } from "react";

//Supabase
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://bcdgtduoxtstjhrmcfoa.supabase.co';
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// Max. distance - pass to API

const Stores = () => {

    const [maxDistance, setMaxDistance] = useState(1);
    console.log("maxDistance", maxDistance);

    const selectedProduct = {
        product_name: "Selectet product name",
        brands: "Selected Brand",
        quantity: "4",
    };

    // const { stores } = useStoreFromAPI(maxDistance);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Stores</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ProductItem
                    product={selectedProduct}
                    onClick={() => {
                        console.log("Selected item clicked");
                    }}
                />{" "}
                {/*console.log can be substituted with a different function */}
                {/* MAPS */}
                <Maps />
                <MaxDistanceSelector onChange={setMaxDistance} />
            </IonContent>
        </IonPage>
    );
};

export default Stores;
