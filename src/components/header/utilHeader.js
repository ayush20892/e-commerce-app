import { RiArrowLeftSLine } from "react-icons/ri";
import { BsHeart, BsHeartFill, BsBag } from "react-icons/bs";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export function UtilHeader({ headerName }) {
  const navigate = useNavigate();
  const { authState } = useAuth();
  return (
    <>
      <nav>
        <div className="ham-brand">
          <RiArrowLeftSLine onClick={() => navigate(-1)} className="ham-icon" />
          <h4>{headerName}</h4>
          {headerName === "Cart" && <h5>{authState.cart.length} Items</h5>}

          {headerName === "WishList" && (
            <h5>{authState.wishlist.length} Items</h5>
          )}
        </div>
        <div className="side-icon">
          {headerName === "WishList" && (
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <BsBag style={{ fontSize: "1.5rem", marginTop: "0.3rem" }} />
              <span>{authState.cart.length}</span>
            </Link>
          )}
          {headerName === "Cart" && (
            <Link
              to="/wishList"
              style={{ textDecoration: "none", color: "black" }}
            >
              {authState.wishlist.length === 0 ? (
                <BsHeart style={{ fontSize: "1.5rem", marginTop: "0.25rem" }} />
              ) : (
                <BsHeartFill
                  style={{
                    fontSize: "1.5rem",
                    marginTop: "0.25rem",
                    fill: "var(--primary-color)",
                  }}
                />
              )}
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
