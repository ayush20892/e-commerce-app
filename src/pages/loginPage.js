import { HomeHeader } from "../components/header/homeHeader.js";
import { HomeMain } from "../components/home-main/homeMain.js";
import { Footer } from "../components/footer/footer.js";

export function LoginPage() {
  return (
    <div> 
      <HomeHeader/>
      <LoginMain/>
      <Footer/>
    </div>
  );
}