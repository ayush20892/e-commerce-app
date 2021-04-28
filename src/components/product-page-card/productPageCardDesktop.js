import "./productPageCardDesktop.css"
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsHeart,BsHeartFill } from "react-icons/bs";
import { FaTape } from "react-icons/fa";
import { VscJersey } from "react-icons/vsc";
import { GrEmoji } from "react-icons/gr";
import { useCart } from "../../context/cartContext.js"
import { useWishList } from "../../context/wishListContext.js"
import { CheckItem } from "../../util.js"
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom"

export function ProductPageCardDesktop({product})
{
  const { categoryName,productType} = useParams()
  const { stateCart,dispatchCart } = useCart()
  const { stateWishList,dispatchWishList } = useWishList() 
  const navigate = useNavigate()
  return(
    <>
      <div className="category-name">
        <span onClick={() => navigate("/")}>Home</span> &nbsp;&nbsp;/&nbsp;
        <span onClick={() => navigate(`/categories/${categoryName}`)}>{categoryName}</span> &nbsp;&nbsp;/&nbsp;
        <span onClick={() => navigate(`/${categoryName}/${productType}`)}>{productType}</span> &nbsp;&nbsp;/&nbsp;
         {product.name}
      </div>
      <div className="product-page-desktop">
        <div>
          <span><AiOutlineShareAlt/></span>
          <img src={product.img} alt=".."/>
        </div>
        <div className="product-content">
          <div className="product-detail">
            <h4>{product.name}</h4>
            <h5>₹ {product.price} <small>Incl. taxes</small></h5>
            <strike>{product.beforeDiscount}</strike>
          </div>
        
          <h4 style={{marginBottom: "1rem"}}>
            Select Size
          </h4>
          <div className="size-chart">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>2XL</div>
            <div>3XL</div>
          </div>
          
          <div className="product-btn">
            { CheckItem(stateWishList.itemsInWishList, product) ? 
              <div onClick={() => dispatchWishList({type:"DELETE-FROM-WISHLIST", payload: product })} className="wish-btn">
                <BsHeartFill style={{fill: "var(--primary-color"}}/>
              </div>
            : 
              <div onClick={() => dispatchWishList({type:"ADD-TO-WISHLIST", payload: product })} className="wish-btn">
                <BsHeart />
              </div>
            }

            { CheckItem(stateCart.itemsInCart, product) ? 
              <button className="cart-btn">
                <Link to="/cart" style={{ textDecoration: "none", color:"white" }}>GO TO CART</Link>
              </button>
              :
              <button onClick={() => dispatchCart({type:"ADD-TO-CART", payload: product })}
            className="cart-btn">
              ADD TO CART
              </button>
            }
          </div>

          <hr className="divide-hr"/>
          <div className="product-extra-detail">
            <div className="product-type">
              <FaTape style={{fontSize: "2rem"}}/>
              <div>
                <h4>Regular Fit</h4>
                <h5>Fits just right - not too tight, not too loose.</h5>
              </div>
            </div>
            <div className="product-type">
              <VscJersey style={{fontSize: "2rem"}}/>
              <div>
                <h4>Single Jersey, 100% Cotton</h4>
                <h5>Classic, lightweight jersey fabric comprising 100% cotton.</h5>
              </div>
            </div>
            <div className="product-type">
              <GrEmoji style={{fontSize: "2rem"}}/>
              <div>
                <h4>15 DAY RETURNS</h4>
                <h5>Easy returns upto 15 days of delivery.</h5>
              </div>
            </div>
          </div>
          <hr className="divide-hr"/>
        </div>
      </div>
    </>
  );
}