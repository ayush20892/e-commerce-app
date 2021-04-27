import { HomeHeader } from "../components/header/homeHeader.js"
import { ProductHeader } from "../components/header/productHeader.js";
import { ProductFooter } from "../components/footer/productFooter.js";
import { ProductCard } from "../components/product-card/productCard.js";
import { ProductCardDesktop } from "../components/product-card/productCardDesktop.js";
import { useMediaQuery } from 'react-responsive';

export function ProductListing() {
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  return (
    <div>
      {isMobile && <HomeHeader/>}
      {!isMobile && <ProductHeader header="Products"/>}

      {isMobile && <ProductCardDesktop/>}
      {!isMobile && <ProductCard/>}

      <ProductFooter/>
    </div>
  );
}
  