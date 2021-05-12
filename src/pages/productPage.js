import { HomeHeader } from "../components/header/homeHeader.js";
import { ProductHeader } from "../components/header/productHeader.js";
import { ProductPageFooter } from "../components/footer/productPageFooter.js";
import { ProductPageCard } from "../components/product-page-card/productPageCard.js";
import { ProductPageCardDesktop } from "../components/product-page-card/productPageCardDesktop.js";
import { useParams } from "react-router";
import { MenData } from "../menData.js";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react"
import axios from "axios"
import { Loader } from "../components/loader/loader.js"

export function ProductPage() {
  const { categoryName, productType, productID } = useParams();
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });


  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const { data } = await axios.get(
          `${process.env.ENDPOINT}/ecom`
        );
        const category = data.products.findIndex(
          (item) => item.categoryName === categoryName
        )
        const  productId = data.products[category][productType].findIndex(item => item.id === productID)
        setProducts(
          data.products[category][productType][productId]
        );
        setLoader(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [categoryName, productType,productID]);

  return (
    <>
      {isMobile && <HomeHeader />}
      {!isMobile && <ProductHeader header="Product-Brand" />}

      {loader ? <Loader/> : isMobile && <ProductPageCardDesktop product={products} />}
      {loader ? <Loader/> : !isMobile && <ProductPageCard product={products} />}

      <ProductPageFooter product={products} />
    </>
  );
}
