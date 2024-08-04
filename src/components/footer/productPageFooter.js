import "./footer.css";
import { CheckItem } from "../../util.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  addToCartHandler,
  addToWishlistHandler,
} from "../../utils/productCalls";

export function ProductPageFooter({ product }) {
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const navigate = useNavigate();
  return (
    <footer>
      <div className="product-page-item">
        {CheckItem(authState.wishlist, product._id) ? (
          <div className="wish-btn">
            <Link
              to="/wishList"
              style={{ textDecoration: "none", color: "Black" }}
            >
              !! GO TO WISHLIST !!
            </Link>
          </div>
        ) : (
          <div
            onClick={() =>
              addToWishlistHandler(
                product._id,
                authState,
                authDispatch,
                navigate,
                setNetworkLoader
              )
            }
            className="wish-btn"
          >
            ADD TO WISHLIST
          </div>
        )}

        {CheckItem(authState.cart, product._id) ? (
          <div className="cart-btn">
            <Link to="/cart" style={{ textDecoration: "none", color: "Black" }}>
              !! GO TO CART !!
            </Link>
          </div>
        ) : (
          <div
            onClick={() =>
              addToCartHandler(
                product._id,
                authState,
                authDispatch,
                navigate,
                setNetworkLoader
              )
            }
            className="cart-btn"
          >
            ADD TO CART
          </div>
        )}
      </div>
    </footer>
  );
}
