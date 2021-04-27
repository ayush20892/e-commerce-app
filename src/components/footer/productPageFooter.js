import "./footer.css";
import { useCart } from "../../context/cartContext.js"
import { useWishList } from "../../context/wishListContext.js"
import { CheckItem } from "../../util.js"
import { Link } from "react-router-dom"


export function ProductPageFooter({product}){
  const { stateCart,dispatchCart } = useCart()
  const { stateWishList,dispatchWishList } = useWishList() 
  return(
    <footer>
      <div className="product-page-item">
        
        { CheckItem(stateWishList.itemsInWishList, product) ? 
          <div className="wish-btn">
            <Link to="/wishList" style={{ textDecoration: "none", color:"Black" }}>!! GO TO WISHLIST !!</Link>
          </div>
        : 
          <div onClick={() => dispatchWishList({type:"ADD-TO-WISHLIST", payload: product })}className="wish-btn">
          ADD TO WISHLIST
          </div>
        }

        { CheckItem(stateCart.itemsInCart, product) ? 
          <div className="cart-btn">
            <Link to="/cart" style={{ textDecoration: "none", color:"Black" }}>!! GO TO CART !!</Link>
          </div>
          :
          <div onClick={() => dispatchCart({type:"ADD-TO-CART", payload: product })}
        className="cart-btn">
          ADD TO CART
          </div>
        }
      </div>
    </footer>
  );
}