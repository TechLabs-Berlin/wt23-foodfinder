import ProductSearch from "../components/ProductSearch";

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonNav,
} from "@ionic/react";

const Home = () => {
    return (
        <IonNav
            root={() => (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Home</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        <IonHeader collapse="condense">
                            <IonToolbar>
                                <IonTitle size="large">Home</IonTitle>
                            </IonToolbar>
                        </IonHeader>

                        <ProductSearch />
                    </IonContent>
                </IonPage>
            )}
        ></IonNav>
    );
};

export default Home;
