import Maps from "../components/Maps";

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { DistanceCalc } from "../components/Distance";

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
                <Maps />
                <DistanceCalc />
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
