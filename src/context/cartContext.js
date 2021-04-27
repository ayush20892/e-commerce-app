import { createContext, useContext, useReducer, useEffect } from 'react'
import { cartReducer } from '../reducer/cartReducer.js'

const CartContext = createContext();

export function CartProvider({children}){
  const [state,dispatch] = useReducer(cartReducer, {itemsInCart: JSON.parse(localStorage.getItem("cartItem")) })

  useEffect(() => {
    localStorage?.setItem("cartItem", JSON.stringify(state.itemsInCart));
  })


  return(
    <CartContext.Provider value={{stateCart: state, dispatchCart: dispatch}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){
  return useContext(CartContext)
}