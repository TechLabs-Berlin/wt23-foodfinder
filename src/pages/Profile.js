import useMyProductsContext from "../hooks/use-products-context";
import ProductItem from "../components/ProductItem";
import { useEffect, useState } from "react";

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

const Profile = () => {
    // When user taps on the full star the product should be eliminated from array and star changes to outline
    // Decision to not set a dependency on useEffect so when unfavorited the product stays until refresh
    const { favorites } = useMyProductsContext();
    let [favs, setFavs] = useState([]);

    useEffect(() => {
        const favList = favorites.map((product, index) => {
            return <ProductItem product={product} key={index} />;
        });
        setFavs(favList);
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Food Finder</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">My Food Finder</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {favs}
            </IonContent>
        </IonPage>
    );
};

export default Profile;
