import './App.css';
import { Routes, Route } from "react-router-dom";
import { ProductListing } from "./pages/products.js";
import { Cart } from "./pages/cart.js";
import { WishList } from "./pages/wishList.js";
import { Home } from "./pages/home.js"
import { ProductPage } from "./pages/productPage.js"
import { Categories } from "./pages/categories.js"
import { CategoryPage } from "./pages/categoryPage.js"
import { LoginPage } from "./pages/loginPage.js"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categoryName/:productType" element={<ProductListing />} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/categories/:categoryName" element={<CategoryPage/>}/>
        <Route path="/:categoryName/:productType/:productID" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/login" element={<LoginPage/>} />
    </Routes>
    </div>
  );
}

export default App;
