import React, { useState } from 'react';
import { IonLabel, IonRange } from '@ionic/react';


//https://ionicframework.com/docs/api/range

function MaxDistanceSet() {
    const [lastEmittedValue=0, setLastEmittedValue] = useState();
    return (
      <>
        <IonRange onIonChange={({ detail }) => setLastEmittedValue(detail.value)} ticks={true} snaps={true} min={0} max={5}></IonRange>
        <IonLabel>Max. distance: {lastEmittedValue} km</IonLabel>
      </>

    );
  }
  
  export { MaxDistanceSet };