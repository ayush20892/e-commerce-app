import "./header.css";
import { BsHeart, BsHeartFill, BsBag } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import icon64 from "../../icon/Utility-UI-64.png";
import { useAuth } from "../../context/authContext";

export function HomeHeader() {
  const navigate = useNavigate();
  const { authState, authDispatch } = useAuth();
  if (authState.wishlist === undefined || authState.cart === undefined) {
    authDispatch({ type: "END_SESSION" });
    navigate("/user/login", { replace: "true" });
  }
  return (
    <>
      <nav>
        <div className="ham-brand">
          <div className="brand-icon" onClick={() => navigate("/")}>
            <img src={icon64} alt="brand icon" />
            <h5>U N U S U A L</h5>
          </div>
          <div className="nav-pills">
            <h5
              onClick={() => navigate("/categories/men")}
              className="nav-item"
            >
              MEN
            </h5>
            <h5
              onClick={() => navigate("/categories/women")}
              className="nav-item"
            >
              WOMEN
            </h5>
            <h5
              onClick={() => navigate("/categories/gadget")}
              className="nav-item"
            >
              GADGETS
            </h5>
          </div>
        </div>
        <div className="side-icon">
          <Link to="/user" style={{ textDecoration: "none", color: "black" }}>
            <FiUser
              className="user"
              style={{ fontSize: "1.2rem", marginTop: "0rem" }}
            />
          </Link>

          <Link
            to="/wishList"
            style={{ textDecoration: "none", color: "black" }}
          >
            {authState.wishlist?.length === 0 ? (
              <BsHeart style={{ marginTop: "0.25rem" }} className="icons" />
            ) : (
              <BsHeartFill
                style={{ marginTop: "0.25rem", fill: "var(--primary-color)" }}
                className="icons"
              />
            )}
          </Link>
          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <BsBag style={{ marginTop: "0rem" }} className="icons" />
            {authState.cart?.length > 0 && <span>{authState.cart.length}</span>}
          </Link>
        </div>
      </nav>
      <hr />
    </>
  );
}
