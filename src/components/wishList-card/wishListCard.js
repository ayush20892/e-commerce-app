import "./wishListCard.css";
import { useCart } from "../../context/cartContext.js"
import { useWishList } from "../../context/wishListContext.js"
import { CheckItem } from "../../util.js"
import { Link } from "react-router-dom"
import { useMediaQuery } from 'react-responsive';

export function WishListCard() {
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  const { stateCart, dispatchCart } = useCart();
  const { stateWishList, dispatchWishList } = useWishList();

  return(
    <>
    {isMobile && <div className="wishList-length"> My WishList <span>{stateWishList.itemsInWishList.length} items</span></div>}
    <div className="wishList-card">
    {stateWishList.itemsInWishList.map(item => (
      <div key={item.id} className="card-card">
        <div>
          <span onClick={() =>
            dispatchWishList({ type: "DELETE-FROM-WISHLIST", payload: item })
          }>&times;</span>
          <img src={item.img} alt=".." />
        </div>
        <div className="card-detail">
          <h4>{item.name}</h4>
          <h5>Rs {item.price}</h5>

          { CheckItem(stateCart.itemsInCart, item) ? 
            <button> In Cart! </button>
            : 
          <button onClick={() => {
            dispatchCart({type:"ADD-TO-CART", payload: item })
            dispatchWishList({ type: "DELETE-FROM-WISHLIST", payload: item })
            }}>
            Move to Cart
          </button>
          }
        </div>
      </div>
    ))}
    </div>
    </>
  );
}