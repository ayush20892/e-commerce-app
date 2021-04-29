import "./wishListCard.css";
import { useCart } from "../../context/cartContext.js"
import { useWishList } from "../../context/wishListContext.js"
import { CheckItem,CategoryMatch, ProductTypeMatch } from "../../util.js"
import { Link } from "react-router-dom"
import { useMediaQuery } from 'react-responsive';
import { MenData} from "../../menData.js"

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
          <Link to={`/${CategoryMatch(item.id)[0]}/${ProductTypeMatch(item.id)[0]}/${item.id}`}>
            <img src={item.img} alt=".." />
          </Link>
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