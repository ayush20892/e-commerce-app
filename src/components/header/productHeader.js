import { RiArrowLeftSLine } from "react-icons/ri";
import { BsHeart,BsHeartFill,BsBag } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"
import "./header.css";
import { useWishList } from "../../context/wishListContext.js"
import { useCart } from "../../context/cartContext.js"

export function ProductHeader({header}){
  const navigate = useNavigate()
  const { stateWishList } = useWishList()
  const { stateCart} = useCart()
  return(
    <>
    <nav>
      <div className="ham-brand">
        <RiArrowLeftSLine onClick={() => navigate(-1)} className="ham-icon" />
        <h4>{header}</h4>
      </div>
      <div className="side-icon">

        <Link to="/wishList" style={{textDecoration: "none", color: "black"}}>
        {stateWishList.itemsInWishList.length === 0 ?<BsHeart style={{fontSize: "1.5rem", marginTop: "0.25rem"}}/> 
        :
        <BsHeartFill style={{fontSize: "1.5rem", marginTop: "0.25rem", fill: "lightgreen"}}/>
        }
        </Link>

        <Link to="/cart" style={{textDecoration: "none", color: "black"}}>
          <BsBag style={{fontSize: "1.5rem", marginTop: "0rem"}}/> 
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
