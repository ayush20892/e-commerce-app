import "./cartCardDesktop.css";
import { useEffect, useState } from "react";
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

export function CartCardDesktop() {
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const navigate = useNavigate();
  const [bagValue, setBagValue] = useState(0);
  const orderTotalValue = bagValue - Math.round((bagValue * 10) / 100);

  useEffect(() => {
    setBagValue(
      authState.cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    );
  }, [authState.cart]);

  const cartItems = () => {
    if (authState.cart.length < 2)
      return <span>{authState.cart.length} item</span>;
    else return <span>{authState.cart.length} item(s)</span>;
  };

  return (
    <div className="cart-box-desktop">
      <div className="card-vertical">
        <div className="bag-item">My Bag {cartItems()} </div>
        {authState.cart.map((item) => (
          <div key={item.product._id} className="card-ver-box">
            <div className=" card-card-ver">
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
                <h5>
                  ₹ {item.product.price}{" "}
                  <strike>{item.product.beforeDiscount}</strike>
                </h5>

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
                    <AiOutlineMinus
                      style={{ margin: "0rem 1.5rem", fontSize: "1.4rem" }}
                    />
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
                    <AiOutlinePlus
                      style={{ margin: "0rem 1.5rem", fontSize: "1.4rem" }}
                    />
                  </button>
                </div>
              </div>
            </div>

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

              {CheckItem(authState.wishlist, item.product._id) ? (
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

      <div className={bagValue > 0 ? "checkout-box" : "checkout-box-condition"}>
        <div className="heading">Price Summary</div>
        <div className="payment-box">
          <div className="payment-box-inner">
            <p>Total MRP (Incl. of taxes)</p>
            <p>
              <span style={{ fontWeight: "bold" }}>₹</span> {orderTotalValue}
            </p>
          </div>
          <div className="payment-box-inner">
            <p>Delivery Fee</p>
            <p style={{ color: "rgb(29, 136, 2)" }}>FREE</p>
          </div>
          <div className="payment-box-inner">
            <p>Bag Discount</p>
            <p>
              (10% off) -{" "}
              <span style={{ fontWeight: "bold" }}>
                ₹ {Math.round((bagValue * 10) / 100)}
              </span>
            </p>
          </div>
          <div className="payment-box-inner" style={{ fontWeight: "590" }}>
            <p>Subtotal</p>
            <p>
              <span style={{ fontWeight: "bold" }}>₹</span> {orderTotalValue}
            </p>
          </div>

          <div
            className={bagValue > 0 ? "saving-label" : "saving-label-condition"}
            style={{
              backgroundColor: "rgba(29, 136, 2, 0.1)",
              color: "rgb(29, 136, 2)",
            }}
          >
            <p>
              You are saving ₹ {Math.round((bagValue * 10) / 100)} on this order
            </p>
          </div>
        </div>

        <div className="checkout-btn">
          <h4>Rs {orderTotalValue}</h4>
          <button onClick={() => navigate("/checkout")}>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}
