import { createContext, useContext, useReducer } from "react";
import { productReducer } from "../reducer/productReducer.js"

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
  const [stateProduct, dispatchProduct] = useReducer(productReducer,{sortby: null, outOfStock: false, fastDelivery: false})
  return(
    <ProductContext.Provider value={{stateProduct,dispatchProduct}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  return useContext(ProductContext)
}