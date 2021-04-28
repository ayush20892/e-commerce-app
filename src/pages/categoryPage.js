import { HomeHeader } from '../components/header/homeHeader.js'
import { ProductHeader } from "../components/header/productHeader.js"
import { Footer } from "../components/footer/footer.js"
import { CategoryList } from "../components/categoryCard/categoryList.js"
import { useMediaQuery } from 'react-responsive';


export function CategoryPage(){
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  return(
    <div>
      {isMobile && <HomeHeader/>}
      {!isMobile && <ProductHeader/>}
      
      <CategoryList/>
      <Footer/>
    </div>
  );
}