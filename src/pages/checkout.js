import React from "react";
import { HomeHeader } from "../components/header/homeHeader.js";
import { UtilHeader } from "../components/header/utilHeader.js";
import { CheckoutBox } from "../components/checkoutBox/checkoutBox.js";
import { useMediaQuery } from "react-responsive";

function Checkout() {
  const isMobile = useMediaQuery({ query: `(max-width: 500px)` });
  return (
    <div>
      {!isMobile && <HomeHeader />}
      {isMobile && <UtilHeader headerName="Checkout" />}

      <CheckoutBox />
    </div>
  );
}

export default Checkout;
