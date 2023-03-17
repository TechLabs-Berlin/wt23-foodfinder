import { createContext, useEffect } from "react";
import { useState } from "react";
import { Preferences } from "@capacitor/preferences";

const MyProducts = createContext();

function Provider({ children }) {
    const [favorites, setFavorites] = useState([]);

    //calls favs and sets favorites
    //runs when page is refreshed
    useEffect(() => {
        checkFavs().then((parsedFavs) => {
            if (parsedFavs) {
                console.log("storage favs", parsedFavs);
                setFavorites(parsedFavs);
            }
        });
    }, []);

    //returns favorites from storage favs
    const checkFavs = async () => {
        const storedFavs = await Preferences.get({ key: "favorites" });
        const parsedFavs = JSON.parse(storedFavs.value);
        console.log(`favs are ${parsedFavs}!`);
        return parsedFavs;
    };

    // stores array after stringifing
    const storeFavs = async (updatedFavs) => {
        await Preferences.set({
            key: "favorites",
            value: JSON.stringify(updatedFavs),
        });
    };

    const addFav = (product) => {
        console.log("ADD FAV", product);
        const updatedFavs = [...favorites, product];
        setFavorites(updatedFavs);
        storeFavs(updatedFavs);
    };

    const deleteFav = (id) => {
        const updatedFavs = favorites.filter((product) => {
            return product.id !== id;
        });
        setFavorites(updatedFavs);
        storeFavs(updatedFavs);
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
