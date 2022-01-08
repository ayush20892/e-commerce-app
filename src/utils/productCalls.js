import {
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  updateCartProductQuantity,
} from "./networkCalls";

export function getProduct(productList, productId, type) {
  const product = productList.find((item) => {
    return item._id === productId;
  });
  if (type === "cart") return { product: product, quantity: 1 };
  return { product: product };
}

export async function addToWishlistHandler(
  productId,
  authState,
  authDispatch,
  navigate,
  setNetworkLoader
) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: "true" });
    return;
  }
  setNetworkLoader(true);
  const data = await addToWishlist(productId);
  setNetworkLoader(false);
  if (data.success)
    authDispatch({
      type: "ADD_TO_WISHLIST",
      payload: getProduct(authState.productList, productId, "wishlist"),
    });
  else {
    authDispatch({ type: "END_SESSION" });
    navigate("/user/login", { replace: "true" });
  }
}

export async function deleteFromWishlistHandler(
  productId,
  authDispatch,
  navigate,
  setNetworkLoader
) {
  setNetworkLoader(true);
  const data = await deleteFromWishlist(productId);
  setNetworkLoader(false);
  if (data.success)
    authDispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId });
  else {
    authDispatch({ type: "END_SESSION" });
    navigate("/user/login", { replace: "true" });
  }
}

export async function addToCartHandler(
  productId,
  authState,
  authDispatch,
  navigate,
  setNetworkLoader
) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: "true" });
    return;
  }
  setNetworkLoader(true);
  const data = await addToCart(productId);
  setNetworkLoader(false);
  if (data.success)
    authDispatch({
      type: "ADD_TO_CART",
      payload: getProduct(authState.productList, productId, "cart"),
    });
  else {
    authDispatch({ type: "END_SESSION" });
    navigate("/user/login", { replace: "true" });
  }
}

export async function deleteFromCartHandler(
  productId,
  authDispatch,
  navigate,
  setNetworkLoader
) {
  setNetworkLoader(true);
  const data = await deleteFromCart(productId);
  setNetworkLoader(false);
  if (data.success)
    authDispatch({ type: "REMOVE_FROM_CART", payload: productId });
  else {
    authDispatch({ type: "END_SESSION" });
    navigate("/user/login", { replace: "true" });
  }
}

export async function increaseCartProductQuantity(
  productId,
  quantity,
  authDispatch,
  navigate,
  setNetworkLoader
) {
  setNetworkLoader(true);
  const data = await updateCartProductQuantity(productId, quantity);
  setNetworkLoader(false);
  if (data.success) authDispatch({ type: "INC_QTY", payload: productId });
  else {
    authDispatch({ type: "END_SESSION" });
    navigate("/user/login", { replace: "true" });
  }
}

export async function decreaseCartProductQuantity(
  productId,
  quantity,
  authDispatch,
  navigate,
  setNetworkLoader
) {
  setNetworkLoader(true);
  const data = await updateCartProductQuantity(productId, quantity);
  setNetworkLoader(false);
  if (data.success) authDispatch({ type: "DEC_QTY", payload: productId });
  else {
    authDispatch({ type: "END_SESSION" });
    navigate("/user/login", { replace: "true" });
  }
}
