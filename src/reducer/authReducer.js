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

    case "EMPTY_CART":
      return { ...acc, cart: [] };

    case "ADD_TO_ADDRESS":
      return { ...acc, addresses: [...acc.addresses, action.payload] };

    case "EDIT_ADDRESS":
      const addresses = acc.addresses.filter(
        (item) => item._id !== action.payload.addressId
      );
      const updatedAddresses = [...addresses, action.payload.address];
      return { ...acc, addresses: updatedAddresses };

    case "DELETE_ADDRESS":
      return {
        ...acc,
        addresses: acc.addresses.filter(
          (address) => address._id !== action.payload
        ),
      };

    case "ADD_TO_ORDER":
      return { ...acc, orders: [...acc.orders, action.payload] };

    case "CANCEL_ORDER":
      console.log(action.payload);
      return {
        ...acc,
        orders: acc.orders.filter((order) => order._id !== action.payload),
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
        userName: action.payload.name,
        email: action.payload.email,
        cart: action.payload.cart,
        wishlist: action.payload.wishlist,
        addresses: action.payload.addresses,
        orders: action.payload.orders,
      };
    }

    case "START_SESSION": {
      return {
        ...acc,
        userId: action.payload.userId,
        userName: action.payload.name,
        email: action.payload.email,
        cart: action.payload.cart,
        wishlist: action.payload.wishlist,
        addresses: action.payload.addresses,
        orders: action.payload.orders,
      };
    }

    case "END_SESSION": {
      localStorage.setItem("session", JSON.stringify({ userId: null }));
      return {
        ...acc,
        userId: "",
        userName: "",
        email: "",
        cart: [],
        wishlist: [],
        addresses: [],
        orders: [],
      };
    }

    case "LOAD_PRODUCTS":
      return { ...acc, productList: action.payload };

    case "TOGGLE_ADDRESS_MODAL":
      return { ...acc, showAddressModal: action.payload };

    case "ADDRESS_TO_EDIT":
      return { ...acc, addressToEdit: action.payload };

    case "USER_PROFILE_TAB":
      return { ...acc, userProfileTab: action.payload };

    default:
      return { ...acc };
  }
}
