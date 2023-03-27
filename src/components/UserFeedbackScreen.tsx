import { useState, useEffect } from 'react'
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    useIonAlert,
    IonRippleEffect,
} from '@ionic/react'
import './main.css'

export default function UserFeedbackScreen(props) {
    const [isOpen, setIsOpen] = useState(true)
    const [presentAlert] = useIonAlert()

    useEffect(() => {
        setIsOpen(true)
    }, [props.name])

    function buttonSubmit(quantity) {
        console.log(quantity) // to do: sending quantity feedback to the database
        setTimeout(() => {
            setIsOpen(false)
            presentAlert({
                subHeader: 'Thank you for your feedback!',
            })
        }, 200)
    }

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
                        <b>Did you find the product?</b>
                        <b>ID: {props.product_id}</b>
                    </div>
                    <div
                        className='ion-activatable ripple-parent'
                        onClick={() => buttonSubmit(0)}
                    >
                        <p>no</p>
                        <IonRippleEffect className='no-button-ripple' />
                    </div>
                    <div
                        className='ion-activatable ripple-parent'
                        onClick={() => buttonSubmit(5)}
                    >
                        <p>some</p>
                        <IonRippleEffect className='some-button-ripple' />
                    </div>
                    <div
                        className='ion-activatable ripple-parent'
                        onClick={() => buttonSubmit(10)}
                    >
                        <p>many</p>
                        <IonRippleEffect className='many-button-ripple' />
                    </div>
                </IonContent>
            </IonModal>
        </>
    )
}
