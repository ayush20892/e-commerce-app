import { HomeHeader } from '../components/header/homeHeader.js'
import { ProductHeader } from "../components/header/productHeader.js"
import { ProductPageFooter } from "../components/footer/productPageFooter.js"
import { ProductPageCard } from "../components/product-page-card/productPageCard.js" 
import { ProductPageCardDesktop } from "../components/product-page-card/productPageCardDesktop.js" 
import { useParams } from "react-router";
import { MenData } from "../menData.js"
import { useMediaQuery } from 'react-responsive';

export function ProductPage(){
  const { categoryName,productType,productID } = useParams()
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  
  const product = MenData[categoryName][productType].find(product => product.id === productID)
  return(
    <>
      {isMobile && <HomeHeader/>}
      {!isMobile && <ProductHeader header="Product-Brand"/>}

      {isMobile && <ProductPageCardDesktop product={product}/>}
      {!isMobile && <ProductPageCard product={product}/>}

      <ProductPageFooter product={product}/>
    </>
  );
}