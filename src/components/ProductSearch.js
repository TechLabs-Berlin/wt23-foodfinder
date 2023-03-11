import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import {
    IonCard,
    IonCardContent,
    IonSearchbar,
    IonList,
    IonSpinner,
} from "@ionic/react";
import "./ProductSearch.css";
import MaxDistanceSelector from "../components/MaxDistanceSelector";

function ProductSearch() {
    const [maxDistance, setMaxDistance] = useState(1);
    console.log("maxDistance", maxDistance);
    const [products, setProducts] = useState([]);
    const [spinnerShow, setSpinnerShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(""); //save selected product

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            setSpinnerShow(true);
            console.log(event.target.value);
            const inputValue = event.target.value;
            // console.log(input);
            fetch(
                `https://de.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${inputValue}`
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        alert("HTTP-Error: " + response.status);
                    }
                })
                .then((response) => {
                    setProducts(response.products);
                    console.log(response.products);
                    setSpinnerShow(false);
                });
        }
    };

    // console.log selected product - to be used in the Map component
    useEffect(() => {
        console.log(selectedProduct.product_name, selectedProduct.brands, selectedProduct.quantity);
      }, [selectedProduct]);
    
      const handleProductClick = (product) => {
        setSelectedProduct(product);
      };

    //list results
    const productResults = products.map((product, index) => {
        return <ProductItem product={product} key={index} onClick={handleProductClick}/>;
    });

    const warningChip =
        productResults.length > 0 ? (
            <IonCard className="warning">
                <IonCardContent>
                    <strong>Warning</strong> There is always a possibility that
                    data about allergens may be missing, incomplete, incorrect
                    or that the product's composition has changed. If you are
                    allergic, always check the information on the actual product
                    packaging.
                </IonCardContent>
                {/* add a closing button */}
            </IonCard>
        ) : null;

    return (
        <>
            <IonSearchbar
                animated={true}
                showCancelButton="focus"
                placeholder="Search"
                inputMode="search"
                onKeyDown={handleEnter}
            ></IonSearchbar>
            <MaxDistanceSelector onChange={setMaxDistance} />
            <IonList id="productList">
                {spinnerShow ? <IonSpinner name="dots" /> : null}
                {warningChip}
                {productResults}
            </IonList>
        </>
    );
}

export default ProductSearch;

// future improvements: according to user input in search:
// if number search codebar
// if string search general