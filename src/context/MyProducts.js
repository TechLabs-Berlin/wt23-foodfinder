import { createContext } from "react";
import { useState } from "react";

const MyProducts = createContext();

function Provider({ children }) {
    let [favorites, setFavorites] = useState([]);

    const addFav = (product) => {
        const updatedFavs = [...favorites, product];
        setFavorites(updatedFavs);
        console.log("my favorites are", favorites);
    };

    const deleteFav = (product) => {
        const updatedFavs = favorites.filter((id) => {
            return favorites.id !== id;
        });

        setFavorites(updatedFavs);
    };

    const valueToShare = { addFav, deleteFav, favorites };

    return (
        <MyProducts.Provider value={valueToShare}>
            {children}
        </MyProducts.Provider>
    );
}

export { Provider };
export default MyProducts;
