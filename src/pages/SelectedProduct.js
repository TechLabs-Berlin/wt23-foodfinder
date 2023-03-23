import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
} from "@ionic/react";

const SelectedProduct = ({ match }) => {
    console.log(match.params.id);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton routerDirection="back" />
                    </IonButtons>
                    <IonTitle>Your Product Availability</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h1>Selected Product: {match.params.id}</h1>
            </IonContent>
        </IonPage>
    );
};

export default SelectedProduct;
