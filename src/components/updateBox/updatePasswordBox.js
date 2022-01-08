import "./updateBox.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateUserPassowrd } from "../../utils/networkCalls";
import { useAuth } from "../../context/authContext";
import { Loader } from "../loader/loader";

export function UpdateUserPasswordBox({ type }) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { authDispatch, networkLoader, setNetworkLoader } = useAuth();
  const navigate = useNavigate();

  async function userUpdateHandler() {
    setNetworkLoader(true);
    const data = await updateUserPassowrd(
      oldPassword,
      password,
      confirmPassword
    );
    setNetworkLoader(false);
    if (data.success) {
      authDispatch({ type: "CREATE_SESSION", payload: data.user });
      navigate("/user", { replace: "true" });
    }
    setError(data.message);
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="update-main">
      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      <div className="update-box">
        <div className="update-form">
          <h3>Update {type}</h3>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confrim Password"
          />
          {error !== "" && <h4>{error}</h4>}
          <button onClick={userUpdateHandler}>Update</button>
          <h5>
            Go to user Dashboard{" "}
            <Link to="/user" style={{ textDecoration: "none" }}>
              DASHBOARD
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}
