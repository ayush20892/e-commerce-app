import { useContext, createContext, useReducer, useState } from "react";
import { authReducer } from "../reducer/authReducer";
import axios from "axios";
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    userId: "",
    cart: [],
    wishlist: [],
    productList: [],
  });

  const [networkLoader, setNetworkLoader] = useState(false);

  return (
    <AuthContext.Provider
      value={{ authState, authDispatch, networkLoader, setNetworkLoader }}
    >
      {children}
    </AuthContext.Provider>
  );
};
