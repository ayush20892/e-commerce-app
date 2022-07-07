import { HomeHeader } from "../components/header/homeHeader.js";
import { UtilHeader } from "../components/header/utilHeader.js";
import { Footer } from "../components/footer/footer.js";
import { WishListCard } from "../components/wishList-card/wishListCard.js";
import { useMediaQuery } from "react-responsive";
import { Loader } from "../components/loader/loader.js";
import { useAuth } from "../context/authContext.js";

export function WishList() {
  const isMobile = useMediaQuery({ query: `(min-width: 500px)` });
  const { networkLoader } = useAuth();
  return (
    <div>
      {isMobile && <HomeHeader />}
      {!isMobile && <UtilHeader headerName={"WishList"} />}

      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}

      <WishListCard />

      <Footer />
    </div>
  );
}
