import { IonIcon, IonItem, IonLabel, IonButton } from "@ionic/react";
import { star } from "ionicons/icons";
import { Icon } from "@iconify/react";

function ProductItem({ product }) {
    // console.log(product);
    const glutenFree = product.labels_tags.includes("en:no-gluten") ? (
        <Icon icon="mdi:gluten-free" color="#D65B79" />
    ) : null;
    const gluten = !product.labels_tags.includes("en:no-gluten") ? (
        <Icon icon="mdi:gluten" color="#5bd6b7" />
    ) : null;
    const vegetarian = product.labels_tags.includes("en:vegetarian") ? (
        <Icon icon="lucide:leaf" color="#5bd6b7" />
    ) : null;
    const vegan = product.labels_tags.includes("en:vegan") ? (
        <Icon icon="lucide:vegan" color="#5bd6b7" />
    ) : null;
    const allergen =
        product.allergens.length > 0 ? (
            <Icon icon="lucide:info" color="#D65B79" />
        ) : null;

    // contains: img, name, brand, amount, icons for intolerances <= 4
    return (
        // detail: chevron button
        <IonItem href="#" detail="true">
            <IonLabel>
                <h3>{product.product_name}</h3>
                <p>Brand:{product.brands}</p>
                {/* <p>Qty:{product.quantity}</p> */}
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
            {gluten}
            {glutenFree}
            {vegetarian}
            {vegan}
            {allergen}
        </IonItem>
    );
}

export default ProductItem;
