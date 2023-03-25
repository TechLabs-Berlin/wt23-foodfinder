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
    IonLabel,
    IonInput,
    IonItem,
} from '@ionic/react'
import './main.css'

export default function UserFeedbackScreen(props) {
    const [isOpen, setIsOpen] = useState(true)
    const [presentAlert] = useIonAlert()

    useEffect(() => {
        setIsOpen(true)
    }, [props.name])

    const handleEnter = event => {
        if (event.key === 'Enter') {
            event.preventDefault() // prevent form submission
            const inputValue = event.target.value
            console.log(inputValue) // should send response to our database
            setTimeout(() => {
                setIsOpen(false)
                presentAlert({
                    subHeader: 'Thank you for your feedback!',
                })
            }, 200)
        }
    }

    const handleSubmit = event => {
        event.preventDefault() // prevent form submission
        const inputValue = event.target.quantity.value
        console.log(inputValue) // should send response to our database
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
                    <form onSubmit={handleSubmit}>
                        <div className='wrapper'>
                            <b>Product: {props.product_id}</b>
                        </div>
                        <IonItem>
                            <IonLabel>Quantity:</IonLabel>
                            <IonInput
                                type='number'
                                inputmode='numeric'
                                name='quantity'
                                placeholder='00'
                                autofocus={true}
                                max={20}
                                min={0}
                                onKeyDown={handleEnter}
                            />
                        </IonItem>
                        <br />
                        <button
                            type='submit'
                            className='ion-activatable ripple-parent'
                        >
                            <p>Submit</p>
                            <IonRippleEffect className='yes-button-ripple' />
                        </button>
                    </form>
                </IonContent>
            </IonModal>
        </>
    )
}
