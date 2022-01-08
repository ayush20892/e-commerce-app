import { HomeHeader } from "../components/header/homeHeader.js";
import { ProductHeader } from "../components/header/productHeader.js";
import { ProductFooter } from "../components/footer/productFooter.js";
import { ProductCard } from "../components/product-listing-card/productCard.js";
import { ProductCardDesktop } from "../components/product-listing-card/productCardDesktop.js";
import { useMediaQuery } from "react-responsive";
import { useProduct } from "../context/productContext.js";
import { SortMenu } from "../components/product-listing-card/mobile-components/sort-menu/sortMenu.js";
import { FilterMenu } from "../components/product-listing-card/mobile-components/filter-menu/filterMenu.js";
import { useAuth } from "../context/authContext.js";
import { Loader } from "../components/loader/loader.js";

export function ProductListing() {
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  const { showSortMenu, showFilterMenu } = useProduct();
  const { networkLoader } = useAuth();

  return (
    <div>
      {isMobile && <HomeHeader />}
      {!isMobile && <ProductHeader header="Products" />}

      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      {isMobile && <ProductCardDesktop />}
      {!isMobile && (
        <>
          <ProductCard />
          {showSortMenu && <SortMenu />}
          {showFilterMenu && <FilterMenu />}
        </>
      )}

      <ProductFooter />
    </div>
  );
}
