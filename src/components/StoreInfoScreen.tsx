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

export default function UserFeedbackScreen(props) {
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        setIsOpen(true)
    }, [props.name])

    return (
        <>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{props.name}</IonTitle>
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
