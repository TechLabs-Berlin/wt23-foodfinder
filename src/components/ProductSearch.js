import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import { IonSearchbar, IonList, IonText } from "@ionic/react";

function ProductSearch() {
    const [input, setInput] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
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
    // console.log selected product - to be used in the API call
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

            <IonList id="productList">{productResults}</IonList>
        </>
    );
}

export default ProductSearch;

// future improvements: according to user input in search:
// if number search codebar
// if string search general
