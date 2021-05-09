import "./homeMain.css";
import menCategory from "../categoryImages/menCategory.jpg"
import womenCategory from "../categoryImages/womenCategory.jpg"
import gadgetCategory from "../categoryImages/gadgetCategory.jpg"
import ecomHoarding from "./ecomHoarding.jpg"
import { Link, useNavigate } from "react-router-dom"
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from "react"
import axios from "axios";



export function HomeMain()
{
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ query: `(max-width: 500px)` });
  

  const [ products, setProducts] = useState({ menTrending: [], womenWhatsNew: [] })
  console.log(products)

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("https://express-neog.herokuapp.com/ecom")
      console.log(data)
      setProducts({ menTrending: data.products[data.products.findIndex(item => item.categoryName === "men")].halfSleeveTshirt, 
                    womenWhatsNew: data.products[data.products.findIndex(item => item.categoryName === "women")].kurti })
    })();
  },[])


  return(
    <main>
      <div className="categories">
        
        
          <div onClick={() => navigate("/categories/men")} className="category">
            <img src={menCategory} alt=".." />
            <h5>Men</h5>
          </div>
        
        
          <div onClick={() => navigate("/categories/women")}  className="category">
            <img src={womenCategory} alt=".." />
            <h5>Women</h5>
          </div>
       

          <div onClick={() => navigate("/categories/gadget")}  className="category">
            <img src={gadgetCategory} alt=".." />
            <h5>Gadget</h5>
          </div>
  
        

      </div>

      <div className="hoarding">

        <img src={ecomHoarding} alt=".." onClick={() => navigate("/women/kurti")}/>

        <div className="hoardingText" onClick={() => navigate("/women/kurti")}>

          <span style={{fontSize: "1.5rem"}}>
            FLAT 500 OFF
          </span>

          <span style={{fontSize: "0.9rem"}}>
            On your 1st Order
          </span>

        </div>
      </div>

      <div className="trending">
        <h2>Trending</h2>
        <div className="trendingProducts">
          {products.menTrending.map(item => {
            if(isMobile && item.trending)
            {
              return(
                <div key={item.id} onClick={() => navigate(`/men/halfSleeveTshirt/${item.id}`)} className="trendingCard">
                  <img src={item.img} alt=".."/>
                  <div className="trendingPrice">
                    ₹{item.price}
                    <strike>
                      {item.beforeDiscount}
                    </strike>
                  </div>
                </div>
              )
            }
          })
        }

        {products.menTrending.map(item => {
          if(!isMobile)
          {
            return(
              <div key={item.id} onClick={() => navigate(`/men/halfSleeveTshirt/${item.id}`)} className="trendingCard">
                <img src={item.img} alt=".."/>
                <div className="trendingPrice">
                  ₹{item.price}
                  <strike>
                    {item.beforeDiscount}
                  </strike>
                </div>
              </div>
            )
          }
        })
      }
        </div>
        <h4>
          <Link to="/men/halfSleeveTshirt" style={{color: "aqua"}}>
            VIEW ALL
          </Link>
        </h4>
      </div>


      <div className="trending">
        <h2>What's New</h2>
        <div className="trendingProducts">
          {products.womenWhatsNew.map(item => {
            if(isMobile && item.trending)
            {
              return(
                <div key={item.id} onClick={() => navigate(`/women/kurti/${item.id}`)} className="trendingCard">
                  <img src={item.img} alt=".."/>
                  <div className="trendingPrice">
                    ₹{item.price}
                    <strike>
                      {item.beforeDiscount}
                    </strike>
                  </div>
                </div>
              )
            }
          })
        }

        {products.womenWhatsNew.map(item => {
          if(!isMobile)
          {
            return(
              <div key={item.id} onClick={() => navigate(`/women/kurti/${item.id}`)} className="trendingCard">
                <img src={item.img} alt=".."/>
                <div className="trendingPrice">
                  ₹{item.price}
                  <strike>
                    {item.beforeDiscount}
                  </strike>
                </div>
              </div>
            )
          }
        })
      }
        </div>
        <h4>
          <Link to="/women/kurti" style={{color: "aqua"}}>
            VIEW ALL
          </Link>
        </h4>
      </div>

    </main>
  );
}