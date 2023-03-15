import { IonItem, IonLabel, IonButton } from "@ionic/react";
import { Icon } from "@iconify/react";
import useMyProductsContext from "../hooks/use-products-context";

function ProductItem({ product, onClick }) {
    // importing favs and handling click
    const { addFav } = useMyProductsContext();

    const handleClick = () => {
        onClick(product);
    };

    const handleFav = (event) => {
        event.preventDefault();
        addFav(product);
    };

    // categories
    let glutenFree;
    let gluten;
    let vegetarian;
    let vegan;
    let allergen;
    let warning;

    if (product.labels_tags && product.labels_tags.length > 0) {
        glutenFree = product.labels_tags.includes("en:no-gluten") ? (
            <Icon icon="mdi:gluten-free" color="#5bd6b7" />
        ) : null;
        gluten = !product.labels_tags.includes("en:no-gluten") ? (
            <Icon icon="mdi:gluten" color="#D65B79" />
        ) : null;
        vegetarian = product.labels_tags.includes("en:vegetarian") ? (
            <Icon icon="lucide:leaf" color="#5bd6b7" />
        ) : null;
        vegan = product.labels_tags.includes("en:vegan") ? (
            <Icon icon="lucide:vegan" color="#5bd6b7" />
        ) : null;
        allergen =
            product.allergens.length > 0 ? (
                <Icon icon="lucide:info" color="#D65B79" />
            ) : null;
    } else {
        warning = <Icon icon="lucide:info" color="#eee114" />;
    }

    return (
        // detail: chevron button
        <IonItem detail="true" onClick={handleClick}>
            <IonLabel>
                <h3>{product.product_name}</h3>
                <p>Brand:{product.brands}</p>
                {/* <p>Qty:{product.quantity}</p> */}
            </IonLabel>

            {/* FAVORITE ICON */}
            <IonButton
                href="#"
                slot="start"
                // shape="round"
                fill="clear"
                size="large"
                onClick={handleFav}
            >
                <Icon
                    href="#"
                    icon="ic:round-star-outline"
                    color="#eee114"
                    width="28"
                ></Icon>
            </IonButton>
            {/*thumbnail image*/}
            <ion-thumbnail slot="start">
                <img
                    alt={product.product_name}
                    // src={product.image_front_thumb_url}
                    src={
                        product.image_front_small_url ||
                        "https://static.thenounproject.com/png/3674270-200.png"
                    }
                />
            </ion-thumbnail>
            {gluten}
            {glutenFree}
            {vegetarian}
            {vegan}
            {allergen}
            {warning}
        </IonItem>
    );
}

export default ProductItem;
