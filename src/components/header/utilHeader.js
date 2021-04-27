import { RiArrowLeftSLine } from "react-icons/ri";
import { BsHeart,BsHeartFill,BsBag } from "react-icons/bs";
import "./header.css";
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../../context/cartContext.js"
import { useWishList } from "../../context/wishListContext.js"

export function UtilHeader({headerName}){
  const navigate = useNavigate()
  const { stateCart} = useCart()
  const { stateWishList } = useWishList()
  return(
    <>
    <nav>
      <div className="ham-brand">
      <RiArrowLeftSLine onClick={() => navigate(-1)} className="ham-icon"/>
      <h4>{headerName}</h4>
      {headerName === "Cart" && <h5>{stateCart.itemsInCart.length} Items</h5>}

      {headerName === "WishList" && <h5>{stateWishList.itemsInWishList.length} Items</h5>}
      </div>
      <div className="side-icon">
        {headerName === "WishList" && 
        <Link to="/cart" style={{textDecoration: "none", color: "black"}}>
          <BsBag style={{fontSize: "1.5rem", marginTop: "0.3rem"}}/>
          <span>
            {stateCart.itemsInCart.length}
          </span>
        </Link> }
        {headerName === "Cart" && 
        <Link to="/wishList" style={{textDecoration: "none", color: "black"}}>
          {stateWishList.itemsInWishList.length === 0 ?<BsHeart style={{fontSize: "1.5rem", marginTop: "0.25rem"}}/> 
          :
          <BsHeartFill style={{fontSize: "1.5rem", marginTop: "0.25rem", fill: "var(--primary-color)"}}/>
          }
        </Link>}
      </div>
    </nav>
    <hr/>
    </>
  );
}

