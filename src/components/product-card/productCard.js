import "./productCard.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useCart } from "../../context/cartContext.js"
import { useWishList } from "../../context/wishListContext.js"
import { CheckItem } from "../../util.js"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"
import { Loader } from "../../components/loader/loader.js"

export function ProductCard() {
  const { stateCart,dispatchCart } = useCart()
  const { stateWishList,dispatchWishList } = useWishList() 
  const { categoryName, productType } = useParams()

  const [ products, setProducts] = useState([])
  const [ loader, setLoader] = useState(false)

  useEffect(() => {
    (async () => {
      try{
      setLoader(true)
      const { data } = await axios.get("https://express-neog.herokuapp.com/ecom")
      setProducts(data.products[data.products.findIndex(item => item.categoryName === categoryName)][productType])
      setLoader(false)
      } catch (err) {
        console.error(err)
      }
    })();
  },[categoryName,productType])




  return(
    <div className="product-card">
    {loader ? <Loader/> : products.map(item => (
      <div key={item.id} className="card-card">
        <div>
          <span>
            { CheckItem(stateWishList.itemsInWishList, item) ? 
              <div onClick={() => dispatchWishList({type:"DELETE-FROM-WISHLIST", payload: item })}>
            <BsHeartFill  style={{fill: "var(--primary-color)"}}/>
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