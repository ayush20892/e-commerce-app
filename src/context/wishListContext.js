import { createContext, useContext, useReducer, useEffect } from "react";
import { wishListReducer } from "../reducer/wishListReducer.js"

const WishListContext = createContext();


export function WishListProvider({ children }){
  const [state, dispatch] = useReducer(wishListReducer, {itemsInWishList: JSON.parse(localStorage.getItem("wishListItem")) || [] })

  useEffect(() => {
    localStorage?.setItem("wishListItem", JSON.stringify(state.itemsInWishList));
  })

  return(
    <WishListContext.Provider value={{stateWishList: state, dispatchWishList: dispatch}}>
      {children}
    </WishListContext.Provider>
  )
}

export function useWishList(){
  return useContext(WishListContext)
}