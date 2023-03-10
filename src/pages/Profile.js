import useMyProductsContext from "../hooks/use-products-context";
import ProductItem from "../components/ProductItem";
import { useState } from "react";

import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

const Profile = () => {
    const { favorites } = useMyProductsContext();
    let [favs, setFavs] = useState([]);

    const handleClick = (event) => {
        event.preventDefault();

        const favList = favorites.map((product, index) => {
            return (
                <ProductItem
                    product={product}
                    key={index}
                    // onClick={handleProductClick}
                />
            );
        });
        setFavs(favList);
    };

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
                <IonButton onclick={handleClick}>Favorites</IonButton>
                {favs}
            </IonContent>
        </IonPage>
    );
};

export default Profile;
