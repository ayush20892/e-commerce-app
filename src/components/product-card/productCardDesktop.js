import "./productCard.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { MenData } from "../../menData.js";
import { useCart } from "../../context/cartContext.js"
import { useWishList } from "../../context/wishListContext.js"
import { CheckItem } from "../../util.js"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

export function ProductCardDesktop() {
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  const { stateCart,dispatchCart } = useCart()
  const { stateWishList,dispatchWishList } = useWishList() 
  const { categoryName, productType } = useParams()
  const productList = MenData[categoryName][productType]
  console.log(categoryName, productType)
  return(
    <div className="product-card">
    <h1>LLLL</h1>
    {productList.map(item => (
      <div key={item.id} className="card-card">
        <div>
          <span>
            { CheckItem(stateWishList.itemsInWishList, item) ? 
              <div onClick={() => dispatchWishList({type:"DELETE-FROM-WISHLIST", payload: item })}>
            <BsHeartFill  style={{fill: "lightgreen"}}/>
            </div>
            : 
            <div onClick={() => dispatchWishList({type:"ADD-TO-WISHLIST", payload: item })}>
              <BsHeart/>
            </div>
            }
          </span>
          <Link to={`/${categoryName}/${productType}/${item.id}`}>
            <img src={item.img} alt=".." />
          </Link>
        </div>
        <div className="card-detail">
          <Link to={`/${categoryName}/${productType}/${item.id}`} style={{textDecoration: "none", color: "black"}}>
            <h4>{item.name}</h4>
            <h5>Rs {item.price}</h5>
          </Link>
          { CheckItem(stateCart.itemsInCart, item) ? 
            <button><Link to="/cart" style={{ textDecoration: "none", color:"Black" }}>!! GO TO CART !!</Link></button>
            : 
          <button onClick={() => dispatchCart({type:"ADD-TO-CART", payload: item })}>
            Add to Cart
          </button>
          }
        </div>
      </div>
    ))}
    </div>
  );
}