import "./footer.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export function CheckOutFooter({ type }) {
  const { authState } = useAuth();
  const [orderValue, setOrderValue] = useState(0);
  const orderTotalValue = orderValue - Math.round((orderValue * 10) / 100);
  const navigate = useNavigate();

  useEffect(() => {
    setOrderValue(
      authState.cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    );
  }, [authState.cart]);

  return (
    <footer>
      <div className="checkout-items">
        <h4>Rs {orderTotalValue}</h4>
        {type === "cart" ? (
          <button onClick={() => navigate("/checkout")}>CHECKOUT</button>
        ) : (
          <button>PAYMENT</button>
        )}
      </div>
    </footer>
  );
}
