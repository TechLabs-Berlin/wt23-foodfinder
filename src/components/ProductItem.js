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
        warning = <Icon icon="lucide:info" color="#F2C600" />;
    }

    return (
        // detail: chevron button
        <IonItem href="#" onClick={handleClick}>
            {/* FAVORITE Button/Icon */}
            <IonButton
                href="#"
                slot="start"
                // shape="round"
                fill="clear"
                size="large"
                onClick={handleFav}
            >
                <Icon href="#" icon="ic:round-star-outline" width="28"></Icon>
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

            {/* Information */}
            <IonLabel>
                <h3>{product.product_name}</h3>
                <p>Brand:{product.brands}</p>
                {/* <p>Qty:{product.quantity}</p> */}
                {/* Product icons */}
                {gluten}
                {glutenFree}
                {vegetarian}
                {vegan}
                {allergen}
                {warning}
            </IonLabel>
        </IonItem>
    );
}

export default ProductItem;
