import { useState } from "react";
import ProductCard from "./ProductCard";

function ProductSearch() {
    const [input, setInput] = useState("");
    const [products, setProducts] = useState([]);
    // save user input
    const handleChange = (event) => {
        setInput(event.target.value);
    };
    // handle click on Search button
    const handleClick = () => {
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
    };
    //list results
    const productResults = products.map((product, index) => {
        return <ProductCard product={product} key={index} />;
    });

    return (
        <>
            <input
                onChange={handleChange}
                id="searchInput"
                type="text"
                placeholder="Search"
                required
            ></input>
            <button onClick={handleClick} id="searchButton">
                Search
            </button>

            <div id="productList">
                <div>{productResults}</div>
            </div>
        </>
    );
}

export default ProductSearch;

// future improvements: according to user input in search:
// if number search codebar
// if string search general
