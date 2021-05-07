import "./cartCardDesktop.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useCart } from "../../context/cartContext.js"
import { useWishList } from "../../context/wishListContext.js"
import { CheckItem, CategoryMatch, ProductTypeMatch  } from "../../util.js"
import { useNavigate } from "react-router-dom"


export function CartCardDesktop() {
  const { stateCart, dispatchCart } = useCart();
  const { stateWishList, dispatchWishList } = useWishList();
  const navigate = useNavigate()


  const cartItems = () => {
    if(stateCart.itemsInCart.length < 2)
      return <span>{stateCart.itemsInCart.length} item</span>
    else 
      return <span>{stateCart.itemsInCart.length} item(s)</span>
  }
  
  return(
    <div className="cart-box-desktop">
      
      <div className="card-vertical">
      <div className="bag-item">My Bag  {cartItems()} </div>
        {stateCart.itemsInCart.map(item => (
          <div className="card-ver-box">
            <div key={item.id} className=" card-card-ver">
              
              <img src={item.img} alt=".." onClick={() => navigate(`/${CategoryMatch(item.id)[0]}/${ProductTypeMatch(item.id)[0]}/${item.id}`)}/>
              
              <div className="card-detail">
                <h4>{item.name}</h4>
                <h5>₹ {item.price} <strike>{item.beforeDiscount}</strike></h5>
                
                <div className="qty">
                  <button onClick={() => dispatchCart({type:"DEC-QTY", payload: item })} disabled={!(item.quantity - 1)}>
                    <AiOutlineMinus style={{margin: "0rem 1.5rem"}}/>
                  </button>

                  <h5>{item.quantity}</h5>

                  <button onClick={() => dispatchCart({type:"INC-QTY", payload: item })}>
                    <AiOutlinePlus style={{margin: "0rem 1.5rem"}}/>
                  </button>

                </div>
              </div>
            </div>
            
            <div className="card-ver-btn">

              <button onClick={() => dispatchCart({type:"DELETE-FROM-CART", payload: item })}className="remove-btn">Remove</button>

              { CheckItem(stateWishList.itemsInWishList, item) ? 
                <button className="move-to-wish-btn"> </button>
                : 
              <button onClick={() => {
                dispatchWishList({type:"ADD-TO-WISHLIST", payload: item }); dispatchCart({type:"DELETE-FROM-CART", payload: item })
                }}className="move-to-wish-btn">Move to wishList</button>
              }
            </div>
          </div>
        ))}
      </div>

      <div className={stateCart.itemsInCart.reduce((acc,item) => acc+(item.price*item.quantity), 0) > 0 ? "checkout-box" : "checkout-box-condition" }>
        <div className="heading">
          Price Summary
        </div>
        <div className="payment-box">
          <div className="payment-box-inner">
              <p>Total MRP (Incl. of taxes)</p>
              <p><span style={{fontWeight: "bold"}}>₹</span> {stateCart.itemsInCart.reduce((acc,item) => acc+(item.price*item.quantity), 400)}</p>
          </div>
          <div className="payment-box-inner">
              <p>Delivery Fee</p>
              <p style={{color: "rgb(29, 136, 2)"}}>FREE</p>
          </div>
          <div className="payment-box-inner">
              <p>Bag Discount</p>
              <p>- <span style={{fontWeight: "bold"}}>₹</span> 400</p>
          </div>
          <div className="payment-box-inner" style={{fontWeight: "590"}}>
              <p>Subtotal</p>
              <p><span style={{fontWeight: "bold"}}>₹</span> {stateCart.itemsInCart.reduce((acc,item) => acc+(item.price*item.quantity), 0)}</p>
          </div>
        
          <div className={stateCart.itemsInCart.reduce((acc,item) => acc+(item.price*item.quantity), 0) > 0 ? "saving-label" : "saving-label-condition" } style={{backgroundColor: "rgba(29, 136, 2, 0.1)", color: "rgb(29, 136, 2)"}}>
             <p>You are saving ₹ 400 on this order</p> 
          </div>

        </div>

        <div className="checkout-btn">
            <h4>Rs {stateCart.itemsInCart.reduce((acc,item) => acc+(item.price*item.quantity), 0)}</h4>
            <button>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}