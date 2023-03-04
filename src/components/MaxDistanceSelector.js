import { useState } from "react";
import { IonLabel, IonRange } from "@ionic/react";

export default function MaxDistanceSelector({ onChange }) {
  const [maxDistance, setMaxDistance] = useState(0);

  const handleChange = (evt) => {
    setMaxDistance(evt.detail.value);
    onChange(evt.detail.value);
  };

  return (
    <>
      <IonRange
        onIonChange={handleChange}
        value={maxDistance}
        ticks={true}
        snaps={true}
        min={0}
        max={5}
      ></IonRange>
      <IonLabel>Max. distance: {maxDistance} km</IonLabel>
    </>
  );
}
