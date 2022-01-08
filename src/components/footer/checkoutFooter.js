import "./footer.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";

export function CheckOutFooter() {
  const { authState } = useAuth();

  const [bagValue, setBagValue] = useState(0);
  useEffect(() => {
    setBagValue(
      authState.cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    );
  }, [authState.cart]);

  return (
    <footer>
      <div className="checkout-items">
        <h4>Rs {bagValue}</h4>
        <button>CHECKOUT</button>
      </div>
    </footer>
  );
}
