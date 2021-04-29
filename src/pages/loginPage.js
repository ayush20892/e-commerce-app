import { HomeHeader } from "../components/header/homeHeader.js";
import { LoginMain } from "../components/login-main/loginMain.js";
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