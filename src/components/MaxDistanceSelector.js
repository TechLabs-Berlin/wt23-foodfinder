import { useState } from 'react'
import { IonLabel, IonRange } from '@ionic/react'

import './main.css'

export default function MaxDistanceSelector({ onChange }) {
    const [maxDistance, setMaxDistance] = useState(2)

    const handleChange = evt => {
        setMaxDistance(evt.detail.value)
        onChange(evt.detail.value)
    }

    return (
        <>
            <IonRange
                className='range'
                onIonChange={handleChange}
                value={maxDistance}
                ticks={true}
                snaps={true}
                min={1}
                max={5}
            >
                <IonLabel slot='start'>
                    Max. distance: {maxDistance} km
                </IonLabel>
            </IonRange>
        </>
    )
}
