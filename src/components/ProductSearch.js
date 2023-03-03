import ProductItem from "../components/ProductItem";
import { useState } from "react";
import { IonCard, IonCardContent, IonSearchbar, IonList } from "@ionic/react";
import "./ProductSearch.css";

function ProductSearch() {
    const [input, setInput] = useState("");
    const [products, setProducts] = useState([]);
    // save user input
    // has issue, searchs empty, will fix with useEffect
    const handleChange = (event) => {
        setInput(event.target.value);
    };
    // handle Enter/click on Search
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            console.log(input);
            fetch(
                `https://de.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms=${input}`
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
                });
        }
    };

    //list results
    const productResults = products.map((product, index) => {
        return <ProductItem product={product} key={index} />;
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
            </IonCard>
        ) : null;

    return (
        <>
            <IonSearchbar
                onIonChange={handleChange}
                // debounce={1000}
                animated={true}
                showCancelButton="focus"
                placeholder="Search"
                inputMode="search"
                onKeyDown={handleEnter}
            ></IonSearchbar>

            <IonList id="productList">
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
