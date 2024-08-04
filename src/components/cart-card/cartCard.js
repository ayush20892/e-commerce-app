import "./cartCard.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { CheckItem, CategoryMatch, ProductTypeMatch } from "../../util.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  deleteFromCartHandler,
  addToWishlistHandler,
  increaseCartProductQuantity,
  decreaseCartProductQuantity,
} from "../../utils/productCalls";

export function CartCard() {
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="card-vertical">
      {authState.cart.map((item) => (
        <div key={item.product._id} className="card-ver-box">
          <div key={item.product._id} className=" card-card-ver">
            <img
              src={item.product.image}
              alt=".."
              onClick={() =>
                navigate(
                  `/${CategoryMatch(item.product.category)[0]}/${
                    ProductTypeMatch(item.product.productType)[0]
                  }/${item.product._id}`
                )
              }
            />
            <div className="card-detail">
              <h4>{item.product.name}</h4>
              <h5>Rs {item.product.price}</h5>
              <div className="qty">
                <button
                  onClick={() =>
                    decreaseCartProductQuantity(
                      item.product._id,
                      item.quantity - 1,
                      authDispatch,
                      navigate,
                      setNetworkLoader
                    )
                  }
                  disabled={!(item.quantity - 1)}
                >
                  <AiOutlineMinus style={{ margin: "0rem 1.5rem" }} />
                </button>

                <h5>{item.quantity}</h5>

                <button
                  onClick={() =>
                    increaseCartProductQuantity(
                      item.product._id,
                      item.quantity + 1,
                      authDispatch,
                      navigate,
                      setNetworkLoader
                    )
                  }
                >
                  <AiOutlinePlus style={{ margin: "0rem 1.5rem" }} />
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-ver-btn">
            <button
              onClick={() =>
                deleteFromCartHandler(
                  item.product._id,
                  authDispatch,
                  navigate,
                  setNetworkLoader
                )
              }
              className="remove-btn"
            >
              Remove
            </button>

            {CheckItem(authState.cart, item.product_id) ? (
              <button className="move-to-wish-btn"> </button>
            ) : (
              <button
                onClick={() => {
                  deleteFromCartHandler(
                    item.product._id,
                    authDispatch,
                    navigate,
                    setNetworkLoader
                  );
                  addToWishlistHandler(
                    item.product._id,
                    authState,
                    authDispatch,
                    navigate,
                    setNetworkLoader
                  );
                }}
                className="move-to-wish-btn"
              >
                Move to wishList
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
