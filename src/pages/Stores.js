import Maps from "../components/Maps";
import MaxDistanceSelector from "../components/MaxDistanceSelector";
import StoreFilter from "../components/StoreFilter";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

const Stores = () => {
  const [maxDistance, setMaxDistance] = useState(0);
  console.log("maxDistance", maxDistance);

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
        {/* MAPS */}
        <Maps />
        <MaxDistanceSelector onChange={setMaxDistance} />
        <StoreFilter />
      </IonContent>
    </IonPage>
  );
};

export default Stores;
