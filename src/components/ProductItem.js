import { IonIcon, IonItem, IonLabel, IonButton } from "@ionic/react";
import { star } from "ionicons/icons";

function ProductItem({ product }) {
    // contains: img, name, brand, amount, icons for intolerances <= 4
    return (
        // detail: chevron button
        <IonItem href="#" detail="true">
            <IonLabel>
                <h3>{product.product_name}</h3>
                <p>Brand:{product.brands}</p>
                <p>Qty:{product.quantity}</p>
            </IonLabel>
            {/* end star for favorite/navigate for navigation */}
            <IonButton
                href="#"
                slot="start"
                shape="round"
                fill="clear"
                size="small"
            >
                <IonIcon href="#" icon={star} color="warning"></IonIcon>
            </IonButton>
            {/*thumbnail image*/}
            <ion-thumbnail slot="start">
                <img
                    alt={product.product_name}
                    // src={product.image_front_thumb_url}
                    src={product.image_front_small_url}
                />
            </ion-thumbnail>
        </IonItem>
    );
}

export default ProductItem;
