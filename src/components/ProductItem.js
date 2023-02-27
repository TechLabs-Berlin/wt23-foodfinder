import { IonItem } from "@ionic/react";

function ProductItem({ product }) {
    // contains: img, name, brand, amount, icons for intolerances <= 4
    return (
        <>
            <IonItem>
                {product.product_name} - Brand:{product.brands} - Qty:
                {product.quantity}
                {/* <img src={} alt={} /> */}
            </IonItem>
        </>
    );
}

export default ProductItem;
