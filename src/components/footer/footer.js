import "./footer.css";
import { BsHeart,BsHeartFill, BsInboxes } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom"
import { useWishList } from "../../context/wishListContext.js"


export function Footer(){
  const { stateWishList } = useWishList()
  return(
    <footer>
      <div className="footer-icons">
        <Link to="/" style={{textDecoration: "none", color: "black"}}>
          <AiOutlineHome style={{fontSize: "2rem", marginTop: "0.8rem", cursor: "pointer"}}/>
          <h4>Home</h4>
        </Link>
        <Link to="/categories" style={{textDecoration: "none", color: "black"}}>
          <BsInboxes style={{fontSize: "2rem", marginTop: "1rem"}}/>
          <h4>Category</h4>
        </Link>

        <Link to="/wishList" style={{textDecoration: "none", color: "black"}}>
        {stateWishList.itemsInWishList.length === 0 ?<BsHeart style={{fontSize: "2rem", marginTop: "0.9rem"}}/> 
        :
        <BsHeartFill style={{fontSize: "2rem", marginTop: "0.9rem", fill: "var(--primary-color"}}/>
        }
          <h4>WishList</h4>
        </Link>

        <Link to="/login" style={{textDecoration: "none", color: "black"}}>
          <HiOutlineUserCircle style={{fontSize: "2rem", marginTop: "1rem"}}/>
          <h4>My Account</h4>
        </Link>
      </div>
    </footer>
  );
}
