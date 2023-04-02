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
    const [presentAlert, dismissAlert] = useIonAlert()

    useEffect(() => {
        setIsOpen(true)
        props.func(isOpen)
    }, [isOpen])

    async function userFeedback(store_id, product_id, qty) {
        const response = await fetch(
            `https://foodfinderapi.herokuapp.com/update-quantity?store_id=${store_id}&product_code=${product_id}&new_quantity=${qty}`,
            {
                method: 'POST',
            },
        )
            .then(data => {
                console.log('Success:', data)
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }

    function buttonSubmit(quantity) {
        userFeedback(props.store_id, parseInt(props.product_id), quantity)
        console.log(
            'Quantity: ',
            quantity,
            'Product ID: ',
            parseInt(props.product_id),
            'Store ID: ',
            props.store_id,
        ) // to do: sending quantity and product id feedback to the database
        setTimeout(() => {
            setIsOpen(false)
            presentAlert({
                subHeader: 'Thank you for your feedback!',
            })
        }, 200)
        setTimeout(() => {
            dismissAlert()
        }, 2500)
    }

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
                        <b>Did you find the product?</b>
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
