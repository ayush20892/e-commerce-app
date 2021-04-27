import { HomeHeader } from "../components/header/homeHeader.js";
import { HomeMain } from "../components/home-main/homeMain.js";
import { Footer } from "../components/footer/footer.js";

export function Home() {
  return (
    <div> 
      <HomeHeader/>
      <HomeMain/>
      <Footer/>
    </div>
  );
}
