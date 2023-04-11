import './SelectedProduct.css'
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    // IonChip,
    // IonLabel,
} from '@ionic/react'

import Maps from '../components/Maps'

const SelectedProduct = ({ match }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton routerDirection='back' />
                    </IonButtons>
                    <IonTitle>
                        {/* Availability for */}
                        {match.params.product_name}
                        <strong> {match.params.brands}</strong>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* <IonChip className='productChip'>
                    <IonLabel>
                        <h3>
                            {match.params.product_name}
                            <strong> {match.params.brands}</strong>
                        </h3>
                    </IonLabel>
                </IonChip> */}
                <Maps
                    page='SelectedProduct'
                    product_id={match.params.id}
                    product_name={match.params.product_name}
                />
            </IonContent>
        </IonPage>
    )
}

export default SelectedProduct
