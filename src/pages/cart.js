import { HomeHeader } from '../components/header/homeHeader.js'
import { UtilHeader } from "../components/header/utilHeader.js";
import { CartCard } from "../components/cart-card/cartCard.js"
import { CartCardDesktop } from "../components/cart-card/cartCardDesktop.js"
import { CheckOutFooter } from "../components/footer/checkoutFooter.js"
import { useMediaQuery } from 'react-responsive';

export function Cart() {
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  return (
    <div>
    {isMobile && <HomeHeader/>}
    {!isMobile && <UtilHeader headerName="Cart"/>}

    {isMobile && <CartCardDesktop/>}
    {!isMobile && <CartCard/>}
      <CheckOutFooter/>
    </div>
  );
}