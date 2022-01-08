import "./productCardDesktop.css";
import { useState, useEffect } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useProduct } from "../../context/productContext.js";
import {
  getSortedData,
  getFilteredData,
} from "../../reducer/productReducer.js";
import { CheckItem } from "../../util.js";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "../loader/loader";
import { useAuth } from "../../context/authContext";
import {
  addToCartHandler,
  addToWishlistHandler,
  deleteFromWishlistHandler,
} from "../../utils/productCalls";
import { getProductListingData } from "../../utils/networkCalls";

export function ProductCardDesktop() {
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const { stateProduct, dispatchProduct } = useProduct();
  const { categoryName, productType } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

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
    <div>
      <div className="category-name">
        <div>
          <span onClick={() => navigate("/")}>Home</span> &nbsp;&nbsp;/&nbsp;
          <span onClick={() => navigate(`/categories/${categoryName}`)}>
            {categoryName}
          </span>{" "}
          &nbsp;&nbsp;/&nbsp;
          {productType}
        </div>

        <div className="header-name">
          <h2>
            {productType} for {categoryName}{" "}
          </h2>
          <span>({products.length})</span>
        </div>
      </div>
      <div className="product-card-desktop">
        <div className="filter-items">
          <div className="filter-sort">
            <h4>SORT BY</h4>
            <div className="filtering-items">
              <h5>
                {" "}
                <input
                  name="choice"
                  type="radio"
                  onClick={() =>
                    dispatchProduct({ type: "SORT", payload: "HIGH-TO-LOW" })
                  }
                />{" "}
                <span>High To Low</span>
              </h5>
              <h5>
                <input
                  name="choice"
                  type="radio"
                  onClick={() =>
                    dispatchProduct({ type: "SORT", payload: "LOW-TO-HIGH" })
                  }
                />{" "}
                <span>Low To High </span>
              </h5>
            </div>
          </div>

          <div className="filter-sort">
            <h4>FILTER</h4>
            <div className="filtering-items">
              <h5>
                <input
                  checked={stateProduct.outOfStock}
                  name="choice"
                  type="checkbox"
                  onChange={() => dispatchProduct({ type: "TOGGLE-STOCK" })}
                />{" "}
                <span>Include Out of Stock</span>
              </h5>
              <h5>
                <input
                  checked={stateProduct.fastDelivery}
                  name="choice"
                  type="checkbox"
                  onChange={() => dispatchProduct({ type: "TOGGLE-DELIVERY" })}
                />{" "}
                <span>Fast delivery Only</span>
              </h5>
            </div>
          </div>

          <div className="filter-sort">
            <button
              onClick={() => {
                dispatchProduct({ type: "RESET" });
                window.location.reload();
              }}
            >
              RESET
            </button>
          </div>
        </div>

        <div className="product-card">
          {loader ? (
            <div className="loader-inside">
              <Loader />
            </div>
          ) : (
            <>
              {filteredData.map((item) => (
                <div key={item._id} className="card-card">
                  <div>
                    {" "}
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
                          <BsHeartFill
                            style={{
                              fill: "var(--primary-color)",
                              fontSize: "0.85rem",
                            }}
                          />
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
                          <BsHeart style={{ fontSize: "0.85rem" }} />
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
                          GO TO CART
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
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
