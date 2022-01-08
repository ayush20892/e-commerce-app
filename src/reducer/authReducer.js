export function authReducer(acc, action) {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      return {
        ...acc,
        wishlist: [...acc.wishlist, action.payload],
      };
    }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...acc,
        wishlist: acc.wishlist.filter(
          (item) => item.product._id !== action.payload
        ),
      };

    case "ADD_TO_CART":
      return { ...acc, cart: [...acc.cart, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        ...acc,
        cart: acc.cart.filter((item) => item.product._id !== action.payload),
      };

    case "INC_QTY":
      return {
        ...acc,
        cart: acc.cart.map((item) => {
          return item.product._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        }),
      };

    case "DEC_QTY":
      return {
        ...acc,
        cart: acc.cart.map((item) => {
          return item.product._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        }),
      };

    case "CREATE_SESSION": {
      localStorage.setItem(
        "session",
        JSON.stringify({ userId: action.payload._id })
      );
      return {
        ...acc,
        userId: action.payload._id,
        cart: action.payload.cart,
        wishlist: action.payload.wishlist,
      };
    }

    case "START_SESSION": {
      return {
        ...acc,
        userId: action.payload.userId,
        cart: action.payload.cart,
        wishlist: action.payload.wishlist,
      };
    }

    case "END_SESSION": {
      localStorage.setItem("session", JSON.stringify({ userId: null }));
      return { ...acc, userId: null, cart: [], wishlist: [] };
    }

    case "LOAD_PRODUCTS":
      return { ...acc, productList: action.payload };

    default:
      return { ...acc };
  }
}
