import { useState, useEffect } from 'react'
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react'
import './main.css'

export default function StoreInfoScreen(props) {
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        setIsOpen(true)
        props.func(isOpen)
    }, [isOpen])

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
                        <b>Opening hours:</b>
                    </div>
                    {/*mockup store info*/}
                    <IonGrid fixed={true}>
                        <IonRow>
                            <IonCol>Monday</IonCol>
                            <IonCol>9:00 - 18:00</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Tuesday</IonCol>
                            <IonCol>9:00 - 18:00</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Wednesday</IonCol>
                            <IonCol>9:00 - 18:00</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Thursday</IonCol>
                            <IonCol>9:00 - 18:00</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Friday</IonCol>
                            <IonCol>9:00 - 18:00</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Saturday</IonCol>
                            <IonCol>9:00 - 14:00</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Sunday</IonCol>
                            <IonCol>Closed</IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </>
    )
}
