import { ProductHeader } from "../components/header/productHeader.js"
import { Footer } from "../components/footer/footer.js"
import { CategoryList } from "../components/categoryCard/categoryList.js"


export function CategoryPage(){
  return(
    <div>
      <ProductHeader/>
      <CategoryList/>
      <Footer/>
    </div>
  );
}