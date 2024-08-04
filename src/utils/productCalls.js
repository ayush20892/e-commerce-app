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
  authDispatch({
    type: "ADD_TO_WISHLIST",
    payload: getProduct(authState.productList, productId, "wishlist"),
  });
  const data = await addToWishlist(productId);
  if (!data.success) {
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
  authDispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId });
  const data = await deleteFromWishlist(productId);
  if (!data.success) {
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
  authDispatch({
    type: "ADD_TO_CART",
    payload: getProduct(authState.productList, productId, "cart"),
  });
  const data = await addToCart(productId);
  if (!data.success) {
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
  authDispatch({ type: "REMOVE_FROM_CART", payload: productId });
  const data = await deleteFromCart(productId);
  if (!data.success) {
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
  authDispatch({ type: "INC_QTY", payload: productId });
  const data = await updateCartProductQuantity(productId, quantity);
  if (!data.success) {
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
  authDispatch({ type: "DEC_QTY", payload: productId });
  const data = await updateCartProductQuantity(productId, quantity);
  if (!data.success) {
    authDispatch({ type: "END_SESSION" });
    navigate("/user/login", { replace: "true" });
  }
}
