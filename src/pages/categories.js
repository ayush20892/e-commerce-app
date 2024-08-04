import { ProductHeader } from "../components/header/productHeader.js"
import { Footer } from "../components/footer/footer.js"
import { CategoryCard } from "../components/categoryCard/categoryCard.js"


export function Categories(){
  return(
    <div>
      <ProductHeader header="Categories"/>
      <CategoryCard/>
      <Footer/>
    </div>
  );
}