import "./productCard.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { CheckItem } from "../../util.js";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader } from "../../components/loader/loader.js";
import { useAuth } from "../../context/authContext";
import {
  getSortedData,
  getFilteredData,
} from "../../reducer/productReducer.js";
import {
  addToCartHandler,
  addToWishlistHandler,
  deleteFromWishlistHandler,
} from "../../utils/productCalls";
import { getProductListingData } from "../../utils/networkCalls";
import { useProduct } from "../../context/productContext";

export function ProductCard() {
  const { categoryName, productType } = useParams();
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const { stateProduct } = useProduct();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const { productResult } = await getProductListingData(
          productType,
          categoryName
        );
        setProducts(productResult);
        setLoader(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [categoryName, productType]);

  const sortedData = getSortedData(products, stateProduct.sortby);
  const filteredData = getFilteredData(
    sortedData,
    stateProduct.outOfStock,
    stateProduct.fastDelivery
  );

  return (
    <div className="product-card">
      {loader ? (
        <div className="loader-inside">
          <Loader />
        </div>
      ) : (
        filteredData.map((item) => (
          <div key={item._id} className="card-card">
            <div>
              <span>
                {CheckItem(authState.wishlist, item._id) ? (
                  <div
                    onClick={() =>
                      deleteFromWishlistHandler(
                        item._id,
                        authDispatch,
                        navigate,
                        setNetworkLoader
                      )
                    }
                  >
                    <BsHeartFill style={{ fill: "var(--primary-color)" }} />
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      addToWishlistHandler(
                        item._id,
                        authState,
                        authDispatch,
                        navigate,
                        setNetworkLoader
                      )
                    }
                  >
                    <BsHeart />
                  </div>
                )}
              </span>
              <Link to={`/${categoryName}/${productType}/${item._id}`}>
                <img src={item.image} alt=".." />
              </Link>
            </div>
            <div className="card-detail">
              <Link
                to={`/${categoryName}/${productType}/${item._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h4>{item.name}</h4>
                <h5>Rs {item.price}</h5>
              </Link>
              {CheckItem(authState.cart, item._id) ? (
                <button>
                  <Link
                    to="/cart"
                    style={{ textDecoration: "none", color: "Black" }}
                  >
                    !! GO TO CART !!
                  </Link>
                </button>
              ) : (
                <button
                  onClick={() =>
                    addToCartHandler(
                      item._id,
                      authState,
                      authDispatch,
                      navigate,
                      setNetworkLoader
                    )
                  }
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
