import React from "react";
import Maps from "./components/Maps";
import ProductSearch from "./components/ProductSearch";
//import GetLocation from "./components/GetLocation";
import { DistanceCalc } from "./components/Distance";
import GetLat from "./components/GetLat";

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
            <br />
            <div>
                <DistanceCalc />
            </div>
        </>
    );
};

export default App;
