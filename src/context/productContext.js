import { createContext, useContext, useReducer, useState } from "react";
import { productReducer } from "../reducer/productReducer.js";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [stateProduct, dispatchProduct] = useReducer(productReducer, {
    sortby: null,
    outOfStock: false,
    fastDelivery: false,
  });
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  return (
    <ProductContext.Provider
      value={{
        stateProduct,
        dispatchProduct,
        showSortMenu,
        setShowSortMenu,
        showFilterMenu,
        setShowFilterMenu,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
