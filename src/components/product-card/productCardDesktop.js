import "./productCardDesktop.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { MenData } from "../../menData.js";
import { useCart } from "../../context/cartContext.js"
import { useWishList } from "../../context/wishListContext.js"
import { CheckItem } from "../../util.js"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

export function ProductCardDesktop() {
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  const { stateCart,dispatchCart } = useCart()
  const { stateWishList,dispatchWishList } = useWishList() 
  const { categoryName, productType } = useParams()
  const productList = MenData[categoryName][productType]
  const navigate = useNavigate()
  console.log(categoryName, productType)
  return(
    <div>
    <div className="category-name">
      <div>
        <span onClick={() => navigate("/")}>Home</span> &nbsp;&nbsp;/&nbsp;
         <span onClick={() => navigate(`/categories/${categoryName}`)}>{categoryName}</span> &nbsp;&nbsp;/&nbsp; 
        {productType}
      </div>

      <div className="header-name">
        <h2>{productType} for {categoryName} </h2>
        <span>({productList.length})</span>
      </div>
    </div>
      <div className="product-card-desktop">
        <div className="filter-items">
          <div className="filter-sort">
            <h4>SORT BY</h4>
            <div className="filtering-items">
              <h5> <input 
              name="choice"  
              type="radio"
              onClick/> <span>High To Low</span></h5>
              <h5><input 
              name="choice"  
              type="radio"
              onClick/> <span>Low To High </span></h5>
            </div>
          </div>

          <div className="filter-sort">
            <h4>FILTER</h4>
            <div className="filtering-items">
              <h5> 
                <input 
                name="choice"  
                type="checkbox"
                onChange/> <span>Include Out of Stock</span>
              </h5>
              <h5> 
                <input 
                name="choice"  
                type="checkbox"
                onChange/> <span>Fast delivery Only</span>
              </h5>
            </div>
          </div>
          
        </div>

        <div className="product-card">
        {productList.map(item => (
          <div key={item.id} className="card-card">
            <div>
              <span>
                { CheckItem(stateWishList.itemsInWishList, item) ? 
                  <div onClick={() => dispatchWishList({type:"DELETE-FROM-WISHLIST", payload: item })}>
                <BsHeartFill  style={{fill: "var(--primary-color)", fontSize: "0.85rem"}}/>
                </div>
                : 
                <div onClick={() => dispatchWishList({type:"ADD-TO-WISHLIST", payload: item })}>
                  <BsHeart style={{fontSize: "0.85rem"}}/>
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
                <button><Link to="/cart" style={{ textDecoration: "none", color:"Black" }}>GO TO CART</Link></button>
                : 
              <button onClick={() => dispatchCart({type:"ADD-TO-CART", payload: item })}>
                Add to Cart
              </button>
              }
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}