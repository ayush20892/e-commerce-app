import "./footer.css";
import { useCart } from "../../context/cartContext.js"


export function CheckOutFooter(){
  const { stateCart } = useCart();
  return(
    <footer>
      <div className="checkout-items">
        <h4>Rs {stateCart.itemsInCart.reduce((acc,item) => acc+(item.price*item.quantity), 0)}</h4>
        <button>CHECKOUT</button>
      </div>
    </footer>
  );
}