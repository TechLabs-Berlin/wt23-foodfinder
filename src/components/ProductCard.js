function ProductCard({ product }) {
    // contains: img, name, brand, amount, icons for intolerances <= 4
    return (
        <>
            <div>
                <p>
                    {product.product_name} - Brand:{product.brands} - Qty:
                    {product.quantity}
                </p>
                {/* <img src={} alt={} /> */}
            </div>
        </>
    );
}

export default ProductCard;
