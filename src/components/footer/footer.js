import "./footer.css";
import { BsHeart, BsHeartFill, BsInboxes } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context//authContext";

export function Footer() {
  const { authState } = useAuth();
  return (
    <footer>
      <div className="footer-icons">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <AiOutlineHome
            style={{
              fontSize: "1.6rem",
              marginTop: "0.5rem",
              cursor: "pointer",
            }}
          />
          <h4>Home</h4>
        </Link>
        <Link
          to="/categories"
          style={{ textDecoration: "none", color: "black" }}
        >
          <BsInboxes style={{ fontSize: "1.6rem", marginTop: "0.7rem" }} />
          <h4>Category</h4>
        </Link>

        <Link to="/wishList" style={{ textDecoration: "none", color: "black" }}>
          {authState.wishlist?.length === 0 ? (
            <BsHeart style={{ fontSize: "1.6rem", marginTop: "0.6rem" }} />
          ) : (
            <BsHeartFill
              style={{
                fontSize: "1.6rem",
                marginTop: "0.6rem",
                fill: "var(--primary-color",
              }}
            />
          )}
          <h4>WishList</h4>
        </Link>

        <Link to="/user" style={{ textDecoration: "none", color: "black" }}>
          <HiOutlineUserCircle
            style={{ fontSize: "1.6rem", marginTop: "0.7rem" }}
          />
          <h4>My Account</h4>
        </Link>
      </div>
    </footer>
  );
}
