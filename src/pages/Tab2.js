import Maps from "../components/Maps";
import { DistanceCalc } from "../components/Distance";
import { MaxDistanceSet } from "../components/MaxDistance";
import StoreFilter from "../components/StoreFilter";

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

const Tab2 = () => {
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
                {/* MAPS */}
                <Maps />
                <DistanceCalc />
                <MaxDistanceSet />
                <StoreFilter />
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
