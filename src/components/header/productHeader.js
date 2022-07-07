import { RiArrowLeftSLine } from "react-icons/ri";
import { BsHeart, BsHeartFill, BsBag } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useAuth } from "../../context/authContext";

export function ProductHeader({ header }) {
  const navigate = useNavigate();
  const { authState } = useAuth();
  return (
    <>
      <nav>
        <div className="ham-brand">
          <RiArrowLeftSLine onClick={() => navigate(-1)} className="ham-icon" />
          <h4>{header}</h4>
        </div>
        <div className="side-icon">
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

          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <BsBag style={{ fontSize: "1.5rem", marginTop: "0rem" }} />
            {authState.cart.length > 0 && <span>{authState.cart.length}</span>}
          </Link>
        </div>
      </nav>
      <hr />
    </>
  );
}
