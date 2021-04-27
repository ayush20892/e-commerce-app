import { HomeHeader } from '../components/header/homeHeader.js'
import { UtilHeader } from "../components/header/utilHeader.js";
import { Footer } from "../components/footer/footer.js";
import { WishListCard } from "../components/wishList-card/wishListCard.js"
import { useMediaQuery } from 'react-responsive';

export function WishList() {
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  return (
    <div>
      {isMobile && <HomeHeader/>}
      {!isMobile && <UtilHeader headerName={"WishList"}/>}
      <WishListCard/>
      <Footer/>
    </div>
  );
}