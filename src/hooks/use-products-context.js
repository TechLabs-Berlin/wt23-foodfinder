import { useContext } from "react";
import MyProducts from "../context/MyProducts";

function useMyProductsContext() {
    return useContext(MyProducts);
}

export default useMyProductsContext;
