import React from "react";
import Maps from "./components/Maps";
import ProductSearch from "./components/ProductSearch";

const App = () => {
    return (
        <>
            <div id="location">
                <Maps />
            </div>
            <br />
            <div id="productSearch">
                <ProductSearch />
            </div>
        </>
    );
};

export default App;
