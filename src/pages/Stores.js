import Maps from '../components/Maps'

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'

const Stores = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Stores</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* MAPS */}
                <Maps page='Stores' />
            </IonContent>
        </IonPage>
    )
}

export default Stores
