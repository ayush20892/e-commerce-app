import React, { useState, useEffect } from "react";
import "./userBox.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { cancelOrder, deleteAddress, logout } from "../../utils/networkCalls";
import { Loader } from "../loader/loader";

export function UserBox() {
  const { authState, authDispatch, networkLoader, setNetworkLoader } =
    useAuth();
  const [tab, setTab] = useState(
    authState.userProfileTab !== "" ? authState.userProfileTab : "profile"
  );
  const navigate = useNavigate();

  async function logoutHandler() {
    setNetworkLoader(true);
    await logout();
    setNetworkLoader(false);
    authDispatch({ type: "END_SESSION" });
    navigate("/", { replace: "true" });
  }

  function toggleTab(tabValue) {
    setTab(tabValue);
  }

  function getDate(orderDate) {
    const date = new Date(orderDate);
    return date.toDateString();
  }

  async function deleteAddressHandler(addressId) {
    authDispatch({ type: "DELETE_ADDRESS", payload: addressId });
    await deleteAddress(addressId);
  }

  async function cancelOrderHandler(orderId) {
    authDispatch({ type: "CANCEL_ORDER", payload: orderId });
    await cancelOrder(orderId);
  }

  useEffect(() => {
    authDispatch({ type: "USER_PROFILE_TAB", payload: "" });
  }, []);

  return (
    <div className="user-container">
      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      <>
        <div className="user-box">
          <div className="tabs">
            <h2
              className={tab === "profile" ? "tab-active" : ""}
              onClick={() => toggleTab("profile")}
            >
              User Info
            </h2>
            <h2
              className={tab === "addresses" ? "tab-active" : ""}
              onClick={() => toggleTab("addresses")}
            >
              Addresses
            </h2>
            <h2
              className={tab === "orders" ? "tab-active" : ""}
              onClick={() => toggleTab("orders")}
            >
              Orders
            </h2>
          </div>
          <div className="tab-details">
            {tab === "profile" && (
              <>
                <h4>
                  Name: {authState.userName}{" "}
                  <span>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/user/update/name"
                    >
                      Update
                    </Link>
                  </span>{" "}
                </h4>
                <h4>
                  Email: {authState.email}{" "}
                  <span>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/user/update/email"
                    >
                      Update
                    </Link>
                  </span>
                </h4>
                <h4>
                  Cart Items : {authState.cart.length} Item
                  {authState.cart.length > 1 ? "(s)" : ""}
                </h4>
                <h4>
                  Wishlist Items : {authState.wishlist.length} Item
                  {authState.wishlist.length > 1 ? "(s)" : ""}
                </h4>
                <div className="update-pwd-btn">
                  <button>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/user/update/passwordUpdate"
                    >
                      Update Password
                    </Link>
                  </button>
                </div>
                <div className="btn">
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              </>
            )}
            {tab === "addresses" && (
              <>
                <div className="address-list">
                  {authState.addresses.map((address) => {
                    return (
                      <div className="address-card" key={address._id}>
                        <div className="name">{address.name}</div>
                        <div className="address-line">
                          {address.addressLine}
                        </div>
                        <div className="address-line">
                          {address.city} {address.state} {address.pinCode}
                        </div>
                        <div className="address-line">{address.country}</div>
                        <div className="mobile-no">
                          <span>Mobile No:</span> {address.mobileNo}
                        </div>
                        <div className="address-action-btns">
                          <button
                            onClick={() => {
                              authDispatch({
                                type: "ADDRESS_TO_EDIT",
                                payload: address._id,
                              });
                              authDispatch({
                                type: "TOGGLE_ADDRESS_MODAL",
                                payload: true,
                              });
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteAddressHandler(address._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
              </>
            )}
            {tab === "orders" &&
              (authState.orders.length > 0 ? (
                <>
                  <div className="order-list">
                    {authState.orders.map((order) => {
                      return (
                        <div className="order-card" key={order._id}>
                          <h3>
                            <span>Order Confirmed</span>
                            <button
                              onClick={() => cancelOrderHandler(order._id)}
                            >
                              Cancel Order
                            </button>
                          </h3>
                          <h4>{getDate(order.createdAt)}</h4>
                          <h4>Order Id: #{order._id}</h4>
                          <div className="order-product-list">
                            {order.products.map(({ product, quantity }) => {
                              return (
                                <div
                                  className="order-product-card"
                                  key={product._id}
                                >
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
                          {order.address && (
                            <div className="order-address">
                              <h3>Order Address</h3>
                              <div
                                className="address-card"
                                key={order.address._id}
                              >
                                <div className="name">{order.address.name}</div>
                                <div className="address-line">
                                  {order.address.addressLine}
                                </div>
                                <div className="address-line">
                                  {order.address.city} {order.address.state}{" "}
                                  {order.address.pinCode}
                                </div>
                                <div className="address-line">
                                  {order.address.country}
                                </div>
                                <div className="mobile-no">
                                  <span>Mobile No:</span>{" "}
                                  {order.address.mobileNo}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="order-amount">
                            <h3>Price Details</h3>
                            <div className="price-detail">
                              <span>Total Price:</span>
                              <span>₹ {order.totalAmount}</span>
                            </div>
                            <div className="price-detail">
                              <span>Discount Price:</span>
                              <span>₹ {order.discountAmount}</span>
                            </div>
                            <div className="price-detail">
                              <span>Order Price:</span>
                              <span>₹ {order.orderAmount}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <h2>No Orders To Display Yet.</h2>
              ))}
          </div>
        </div>
      </>
    </div>
  );
}
