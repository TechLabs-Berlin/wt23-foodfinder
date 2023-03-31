import { useState, useEffect } from 'react'
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
} from '@ionic/react'
import './main.css'

export default function StoreInfoScreen(props) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(true)
    }, [props.store_name])

    return (
        <>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{props.store_name}</IonTitle>
                        <IonButtons slot='end'>
                            <IonButton onClick={() => setIsOpen(false)}>
                                Close
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className='ion-padding'>
                    <div className='wrapper'>
                        <b>Store info placeholder</b>
                    </div>
                </IonContent>
            </IonModal>
        </>
    )
}
