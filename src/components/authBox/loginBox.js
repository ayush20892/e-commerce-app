import "./authBox.css";
import icon64 from "../../icon/Utility-UI-64.png";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { login } from "../../utils/networkCalls";
import { Loader } from "../loader/loader";

export function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.from.pathname || "/";
  const { authDispatch, networkLoader, setNetworkLoader } = useAuth();

  async function loginHandler() {
    setNetworkLoader(true);
    const res = await login(email, password);
    setNetworkLoader(false);
    if (res.data.success) {
      authDispatch({ type: "CREATE_SESSION", payload: res.data.user });
      navigate(previousPath, { replace: "true" });
    }
    setError(res.data.message);
    setEmail("");
    setPassword("");
  }

  async function guestLoginHandler() {
    setNetworkLoader(true);
    const res = await login("ayush20892@gmail.com", "123456");
    setNetworkLoader(false);
    if (res.data.success)
      authDispatch({ type: "CREATE_SESSION", payload: res.data.user });
    navigate(previousPath, { replace: "true" });
  }

  return (
    <div className="login-main">
      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      <div className="login-box">
        <img src={icon64} alt=".." />
        <div className="login-form">
          <h3>Login</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Password"
          />
          {error !== "" && <h4>{error}</h4>}
          <div className="forgotPass-btn">
            <Link
              to="/user/forgotPassword"
              style={{ textDecoration: "none", color: "black" }}
            >
              Forgot Password ?
            </Link>
          </div>
          <button onClick={loginHandler}>Continue</button>
          <h5>Or</h5>
          <button className="guest-login-btn" onClick={guestLoginHandler}>
            Guest Login
          </button>
          <h5>
            New to Website?{" "}
            <Link to="/user/signup" style={{ textDecoration: "none" }}>
              SIGN UP
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}
