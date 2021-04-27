import { ProductHeader } from "../components/header/productHeader.js"
import { ProductPageFooter } from "../components/footer/productPageFooter.js"
import { ProductPageCard } from "../components/product-page-card/productPageCard.js" 
import { useParams } from "react-router";
import { MenData } from "../menData.js"

export function ProductPage(){
  const { categoryName,productType,productID } = useParams()
  
  const product = MenData[categoryName][productType].find(product => product.id === productID)
  return(
    <>
      <ProductHeader header="Product-Brand"/>
      <ProductPageCard product={product}/>
      <ProductPageFooter product={product}/>
    </>
  );
}