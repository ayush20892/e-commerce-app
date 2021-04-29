import "./homeMain.css";
import menCategory from "../categoryImages/menCategory.jpg"
import womenCategory from "../categoryImages/womenCategory.jpg"
import gadgetCategory from "../categoryImages/gadgetCategory.jpg"
import ecomHoarding from "./ecomHoarding.jpg"
import { MenData } from "../../menData.js"
import { Link, useNavigate } from "react-router-dom"
import { useMediaQuery } from 'react-responsive';



export function HomeMain()
{
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ query: `(max-width: 500px)` });
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

        <img src={ecomHoarding} alt=".." />
        <div className="hoardingText">

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
          {MenData.men.halfSleeveTshirt.map(item => {
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

        {MenData.men.halfSleeveTshirt.map(item => {
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
          {MenData.women.halfSleeveTshirt.map(item => {
            if(isMobile && item.whatsNew)
            {
              return(
                <div key={item.id} onClick={() => navigate(`/women/halfSleeveTshirt/${item.id}`)} className="trendingCard">
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

        {MenData.women.halfSleeveTshirt.map(item => {
          if(!isMobile)
          {
            return(
              <div key={item.id} onClick={() => navigate(`/women/halfSleeveTshirt/${item.id}`)} className="trendingCard">
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
          <Link to="/women/halfSleeveTshirt" style={{color: "aqua"}}>
            VIEW ALL
          </Link>
        </h4>
      </div>

    </main>
  );
}