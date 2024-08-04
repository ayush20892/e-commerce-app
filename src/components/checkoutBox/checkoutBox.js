import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { AiOutlinePlus } from "react-icons/ai";
import "./checkoutBox.css";
import { useNavigate } from "react-router-dom";
import { proceedToPay } from "../../utils/razorpayCall";

export function CheckoutBox() {
  const { authState, authDispatch } = useAuth();
  const [selectAddress, setSelectedAddress] = useState();
  const [error, setError] = useState("");
  const [orderValue, setOrderValue] = useState(0);
  const discountValue = Math.round((orderValue * 10) / 100);
  const orderTotalValue = orderValue - Math.round((orderValue * 10) / 100);
  const navigate = useNavigate();

  const checkAddress = () =>
    selectAddress
      ? proceedToPay(
          orderTotalValue,
          orderValue,
          discountValue,
          selectAddress,
          authState,
          authDispatch,
          navigate
        )
      : setError("Please Select the Address");

  useEffect(() => {
    setOrderValue(
      authState.cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    );
  }, [authState.cart]);

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="order-checkout-box">
        <div className="address-selection">
          {authState.addresses.map((item) => (
            <div className="address" key={item._id}>
              <input
                type="radio"
                name="address"
                id={item._id}
                onChange={() => {
                  setSelectedAddress(item);
                  setError("");
                }}
              ></input>
              <label htmlFor={item._id} className="address-card">
                <div className="name">{item.name}</div>
                <div className="address-line">{item.addressLine}</div>
                <div className="address-line">
                  {item.city} {item.state} {item.pinCode}
                </div>
                <div className="address-line">{item.country}</div>
                <div className="mobile-no">
                  <span>Mobile No:</span> {item.mobileNo}
                </div>
              </label>
            </div>
          ))}
          <div
            className="new-address-btn"
            onClick={() =>
              authDispatch({
                type: "TOGGLE_ADDRESS_MODAL",
                payload: true,
              })
            }
          >
            <AiOutlinePlus className="plus-icon" />
            <span>Add New Address</span>
          </div>
        </div>
        <div className="order-details">
          <h3>Order Details</h3>
          <div className="order-product-list">
            {authState.cart.map(({ product, quantity }) => {
              return (
                <div className="order-product-card" key={product._id}>
                  <img src={product.image} alt="product" />
                  <div className="product-details">
                    <div>{product.name}</div>
                    <div>
                      {quantity} x ₹{product.price}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="price-summary">
            <h3>Price Summary</h3>
            <h4>
              <span>Total Amount</span>
              <span>₹ {orderValue}</span>
            </h4>
            <h4>
              <span>Discount Amount</span>
              <span>- ₹ {Math.round((orderValue * 10) / 100)}</span>
            </h4>
            <h4>
              <span>Delivery Charge</span>
              <span>FREE</span>
            </h4>
            <h4>
              <span>Order Amount</span>
              <span>₹ {orderTotalValue}</span>
            </h4>
          </div>
          {selectAddress && (
            <div className="selected-address">
              <h3>Deliver To: </h3>
              <div className="address-card">
                <div className="name">{selectAddress.name}</div>
                <div className="address-line">{selectAddress.addressLine}</div>
                <div className="address-line">
                  {selectAddress.city} {selectAddress.state}{" "}
                  {selectAddress.pinCode}
                </div>
                <div className="address-line">{selectAddress.country}</div>
                <div className="mobile-no">
                  <span>Mobile No:</span> {selectAddress.mobileNo}
                </div>
              </div>
            </div>
          )}
          {error !== "" && <h4 className="error-message">{error}</h4>}
          <button onClick={checkAddress}>Procced To Payment</button>
        </div>
      </div>
      <footer>
        <div className="checkout-items">
          <h4>Rs {orderTotalValue}</h4>
          <button onClick={checkAddress}>PAYMENT</button>
        </div>
      </footer>
    </div>
  );
}
