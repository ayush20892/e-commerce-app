import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { ProductListing } from "./pages/productListing.js";
import { Cart } from "./pages/cart.js";
import { WishList } from "./pages/wishList.js";
import { Home } from "./pages/home.js";
import { ProductPage } from "./pages/productPage.js";
import { Categories } from "./pages/categories.js";
import { CategoryPage } from "./pages/categoryPage.js";
import { UserPage } from "./pages/userPage.js";
import { UpdateUserPage } from "./pages/userUpdatePage";
import { Loader } from "./components/loader/loader";
import { useAuth } from "./context/authContext";
import { getAllProducts, userDashboard } from "./utils/networkCalls";
import { ProductProvider } from "./context/productContext";
import Checkout from "./pages/checkout";
import AddressModal from "./components/addressModal/addressModal";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const session = JSON.parse(localStorage.getItem("session"));
  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();

  async function loadInitialData() {
    const data = await getAllProducts();
    if (data.success)
      authDispatch({ type: "LOAD_PRODUCTS", payload: data.productResult });

    if (session?.userId) {
      const userData = await userDashboard();

      if (!userData.success) {
        authDispatch({ type: "END_SESSION" });
        navigate("/user/login", { replace: "true" });
      } else {
        authDispatch({ type: "START_SESSION", payload: userData.user });
      }
    } else {
      authDispatch({ type: "END_SESSION" });
      navigate("/user/login", { replace: "true" });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="App">
      {authState.showAddressModal && <AddressModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:categoryName/:productType"
          element={
            <ProductProvider>
              <ProductListing />
            </ProductProvider>
          }
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route
          path="/:categoryName/:productType/:productID"
          element={<ProductPage />}
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishList"
          element={
            <PrivateRoute>
              <WishList />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route path="/user/:action" element={<UserPage />} />
        <Route path="/user/update/:updateType" element={<UpdateUserPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
