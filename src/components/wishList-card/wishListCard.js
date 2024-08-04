import "./wishListCard.css";
import { CheckItem, CategoryMatch, ProductTypeMatch } from "../../util.js";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../../context/authContext";
import {
  addToCartHandler,
  deleteFromWishlistHandler,
} from "../../utils/productCalls";

export function WishListCard() {
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {isMobile && (
        <div className="wishList-length">
          {" "}
          My WishList <span>{authState.wishlist.length} items</span>
        </div>
      )}
      <div className="wishList-card">
        {authState.wishlist.map((item) => (
          <div key={item.product._id} className="card-card">
            <div>
              <span
                onClick={() =>
                  deleteFromWishlistHandler(
                    item.product._id,
                    authDispatch,
                    navigate,
                    setNetworkLoader
                  )
                }
              >
                &times;
              </span>
              <Link
                to={`/${CategoryMatch(item.product.category)[0]}/${
                  ProductTypeMatch(item.product.productType)[0]
                }/${item.product._id}`}
              >
                <img src={item.product.image} alt=".." />
              </Link>
            </div>
            <div className="card-detail">
              <h4>{item.product.name}</h4>
              <h5>Rs {item.product.price}</h5>

              {CheckItem(authState.cart, item.product._id) ? (
                <button> In Cart! </button>
              ) : (
                <button
                  onClick={() => {
                    addToCartHandler(
                      item.product._id,
                      authState,
                      authDispatch,
                      navigate,
                      setNetworkLoader
                    );
                    deleteFromWishlistHandler(
                      item.product._id,
                      authDispatch,
                      navigate,
                      setNetworkLoader
                    );
                  }}
                >
                  Move to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
