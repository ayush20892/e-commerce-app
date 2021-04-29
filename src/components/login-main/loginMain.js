import "./loginMain.css"
import LoginSale from "../categoryImages/LoginSale.jpg"

export function LoginMain() {
  return(
    <div className="login-main">
      <div className="login-box">
        <img src={LoginSale} alt=".." />
        <div className="login-form">
          
          <h3>Login</h3>
          <input  placeholder="Username"/>
          <input type="password" placeholder="Password" />
          <button>Login</button>
          <h5>New to Website? <span>SIGN UP</span></h5>
        </div>
      </div>
    </div>
  )
}