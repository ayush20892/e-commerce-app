import { HomeHeader } from "../components/header/homeHeader.js";
import { UtilHeader } from "../components/header/utilHeader.js";
import { CartCard } from "../components/cart-card/cartCard.js";
import { CartCardDesktop } from "../components/cart-card/cartCardDesktop.js";
import { CheckOutFooter } from "../components/footer/checkoutFooter.js";
import { useMediaQuery } from "react-responsive";
import { Loader } from "../components/loader/loader.js";
import { useAuth } from "../context/authContext.js";

export function Cart() {
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  const { networkLoader } = useAuth();
  return (
    <div>
      {isMobile && <HomeHeader />}
      {!isMobile && <UtilHeader headerName="Cart" />}

      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}

      {isMobile && <CartCardDesktop />}
      {!isMobile && <CartCard />}

      <CheckOutFooter type="cart" />
    </div>
  );
}
