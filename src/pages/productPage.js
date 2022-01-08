import { HomeHeader } from "../components/header/homeHeader.js";
import { ProductHeader } from "../components/header/productHeader.js";
import { ProductPageFooter } from "../components/footer/productPageFooter.js";
import { ProductPageCard } from "../components/product-page-card/productPageCard.js";
import { ProductPageCardDesktop } from "../components/product-page-card/productPageCardDesktop.js";
import { useParams } from "react-router";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { Loader } from "../components/loader/loader.js";
import { getASingleProduct } from "../utils/networkCalls.js";
import { useAuth } from "../context/authContext.js";

export function ProductPage() {
  const { categoryName, productType, productID } = useParams();
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const { networkLoader } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const { data } = await getASingleProduct(productID);
        setProducts(data.product);
        setLoader(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [categoryName, productType, productID]);

  return (
    <>
      {isMobile && <HomeHeader />}
      {!isMobile && <ProductHeader header="Product-Brand" />}

      {loader ? (
        <div className="loader-inside">
          <Loader />
        </div>
      ) : (
        <>
          {networkLoader && (
            <div className="network-loader">
              <Loader />
            </div>
          )}
          {isMobile && <ProductPageCardDesktop product={products} />}
          {!isMobile && <ProductPageCard product={products} />}
        </>
      )}

      <ProductPageFooter product={products} />
    </>
  );
}
