import "./header.css";
import { BsHeart,BsHeartFill, BsBag } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"
import { useWishList } from "../../context/wishListContext.js"
import { useCart } from "../../context/cartContext.js"
import icon64 from "../../icon/Utility-UI-64.png"


export function HomeHeader(){
  const { stateWishList } = useWishList()
  const navigate = useNavigate()
  const { stateCart} = useCart();
  return(
    <>
    <nav>
      <div className="ham-brand">
        <div style={{top: "-0.3rem"}} className="ham-icon" >
          &#9776;
        </div>
        <div className="brand-icon" onClick={() => navigate("/")}>
          <img src={icon64} alt="brand icon" />
          <h4></h4>
        </div>
        <div className="nav-pills">
          <h5 onClick={() => navigate('/categories/men')} className="nav-item">MEN</h5>
          <h5 onClick={() => navigate('/categories/women')} className="nav-item">WOMEN</h5>
          <h5 onClick={() => navigate('/categories/gadget')} className="nav-item">GADGETS</h5>
        </div>
      </div>
      <div className="side-icon">
        <Link to="/login" style={{textDecoration: "none", color: "black"}}>
          <FiUser className="user" style={{fontSize: "1.2rem", marginTop: "0rem"}}/>
        </Link>

        <Link to="/wishList" style={{textDecoration: "none", color: "black"}}>
          {stateWishList.itemsInWishList.length === 0 ?<BsHeart style={{marginTop: "0.25rem"}} className="icons"/> 
          :
          <BsHeartFill style={{ marginTop: "0.25rem", fill: "var(--primary-color)"}} className="icons"/>
          }
        </Link>
        <Link to="/cart" style={{textDecoration: "none", color: "black"}}>
          <BsBag style={{ marginTop: "0rem"}} className="icons"/>
          <span>
            {stateCart.itemsInCart.length}
          </span> 
        </Link>
      </div>
    </nav>
    <hr/>
    </>
  );
}