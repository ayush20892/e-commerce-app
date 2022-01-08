import "./homeMain.css";
import menCategory from "../categoryImages/menCategory.jpg";
import womenCategory from "../categoryImages/womenCategory.jpg";
import gadgetCategory from "../categoryImages/gadgetCategory.jpg";
import ecomHoarding from "./ecomHoarding.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "../loader/loader.js";

export function HomeMain() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: `(max-width: 500px)` });
  const [trending, setTrending] = useState([]);
  const [whatsNew, setWhatsNew] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        if (isMobile) {
          const {
            data: { productResult },
          } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getAllProducts?productType=halfSleeveTshirt&category=men&limit=6`
          );
          setTrending(productResult);
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getAllProducts?productType=halfSleeveTshirt&category=women&limit=6`
          );
          setWhatsNew(data.productResult);
        } else {
          const {
            data: { productResult },
          } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getAllProducts?productType=halfSleeveTshirt&category=men`
          );
          setTrending(productResult);
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getAllProducts?productType=halfSleeveTshirt&category=women`
          );
          setWhatsNew(data.productResult);
        }
        setLoader(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [isMobile]);

  return (
    <main>
      <div className="categories">
        <div onClick={() => navigate("/categories/men")} className="category">
          <img src={menCategory} alt=".." />
          <h5>Men</h5>
        </div>

        <div onClick={() => navigate("/categories/women")} className="category">
          <img src={womenCategory} alt=".." />
          <h5>Women</h5>
        </div>

        <div
          onClick={() => navigate("/categories/gadget")}
          className="category"
        >
          <img src={gadgetCategory} alt=".." />
          <h5>Gadget</h5>
        </div>
      </div>

      <div className="hoarding">
        <img
          src={ecomHoarding}
          alt=".."
          onClick={() => navigate("/women/kurti")}
        />

        <div className="hoardingText" onClick={() => navigate("/women/kurti")}>
          <span style={{ fontSize: "1.5rem" }}>FLAT 500 OFF</span>

          <span style={{ fontSize: "0.9rem" }}>On your 1st Order</span>
        </div>
      </div>

      <div className="trending">
        <h2>Trending</h2>
        <div className="trendingProducts">
          {loader ? (
            <div className="loader-inside">
              <Loader />
            </div>
          ) : (
            trending.map((item) => {
              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/men/halfSleeveTshirt/${item._id}`)}
                  className="trendingCard"
                >
                  <img src={item.image} alt=".." />
                  <div className="trendingPrice">
                    ₹{item.price}
                    <strike>{item.priceBeforeDiscount}</strike>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <h4>
          <Link to="/men/halfSleeveTshirt" style={{ textDecoration: "none" }}>
            VIEW ALL
          </Link>
        </h4>
      </div>

      <div className="trending">
        <h2>What's New</h2>
        <div className="trendingProducts">
          {loader ? (
            <div className="loader-inside">
              <Loader />
            </div>
          ) : (
            whatsNew.map((item) => {
              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/women/kurti/${item._id}`)}
                  className="trendingCard"
                >
                  <img src={item.image} alt=".." />
                  <div className="trendingPrice">
                    ₹{item.price}
                    <strike>{item.priceBeforeDiscount}</strike>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <h4>
          <Link to="/women/kurti" style={{ textDecoration: "none" }}>
            VIEW ALL
          </Link>
        </h4>
      </div>
    </main>
  );
}
