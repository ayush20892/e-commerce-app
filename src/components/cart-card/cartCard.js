import "./cartCard.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useCart } from "../../context/cartContext.js"
import { useWishList } from "../../context/wishListContext.js"
import { CheckItem } from "../../util.js"
import { Link } from "react-router-dom"
import { useEffect } from "react";

export function CartCard() {
  const { stateCart, dispatchCart } = useCart();
  const { stateWishList, dispatchWishList } = useWishList();
  
  return(
    <div className="card-vertical">
      {stateCart.itemsInCart.map(item => (
        <div className="card-ver-box">
          <div key={item.id} className=" card-card-ver">
            <img src={item.img} alt=".." />
            <div className="card-detail">
              <h4>{item.name}</h4>
              <h5>Rs {item.price}</h5>
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
          <hr/>
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
  );
}