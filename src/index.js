import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from "react-router-dom"
import { CartProvider } from "./context/cartContext.js"
import { WishListProvider } from "./context/wishListContext.js"
import { ProductProvider } from "./context/productContext.js"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <CartProvider>
          <WishListProvider>
            <App />
          </WishListProvider>
        </CartProvider>
        </ProductProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


