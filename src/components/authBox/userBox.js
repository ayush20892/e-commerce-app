import React, { useState, useEffect } from "react";
import "./userBox.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { logout, userDashboard } from "../../utils/networkCalls";
import { Loader } from "../loader/loader";

export function UserBox() {
  const [user, setUser] = useState(null);
  const { authState, authDispatch, networkLoader, setNetworkLoader } =
    useAuth();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await userDashboard();
      if (res.data.success) {
        setUser(res.data.user);
        setLoader(false);
      }
      if (!res.data.success) logoutHandler();
    })();
  }, []);

  async function logoutHandler() {
    setNetworkLoader(true);
    await logout();
    setNetworkLoader(false);
    authDispatch({ type: "END_SESSION" });
    navigate("/", { replace: "true" });
  }

  return (
    <div className="user-container">
      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      <>
        {loader ? (
          <div className="loader-inside">
            <Loader />
          </div>
        ) : (
          <div className="user-box">
            <h1>User Info</h1>
            <h4>
              Name: {user.name}{" "}
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
              Email: {user.email}{" "}
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
          </div>
        )}
      </>
    </div>
  );
}
