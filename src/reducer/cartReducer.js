export function cartReducer(acc, action){
  switch(action.type)
  {
    case "ADD-TO-CART": return {...acc, itemsInCart: [...acc.itemsInCart, action.payload]}

    case "DELETE-FROM-CART" : return {...acc, itemsInCart: acc.itemsInCart.filter(item => item.id !== action.payload.id)}

    case "INC-QTY" : return {...acc, itemsInCart: acc.itemsInCart.map(item => {
         return item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item;
    })}

    case "DEC-QTY": return {...acc, itemsInCart: acc.itemsInCart.map(item => {
      return item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item;
 })}

    default: return {...acc};
  }
}