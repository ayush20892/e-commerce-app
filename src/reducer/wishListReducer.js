export function wishListReducer(acc, action){
  switch(action.type)
  {
    case "ADD-TO-WISHLIST": return {...acc, itemsInWishList: [...acc.itemsInWishList, action.payload]}

    case "DELETE-FROM-WISHLIST" : return {...acc, itemsInWishList: acc.itemsInWishList.filter(item => item.id !== action.payload.id)}

    default: return {...acc};
  }
}
