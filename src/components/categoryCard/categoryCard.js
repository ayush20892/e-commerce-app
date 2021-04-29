import "./categoryCard.css"
import menCategory from "../categoryImages/menCategory.jpg"
import womenCategory from "../categoryImages/womenCategory.jpg"
import gadgetCategory from "../categoryImages/gadgetCategory.jpg"
import { Link } from "react-router-dom"

export function CategoryCard()
{
  return(
    <div className="category-cards">
    
    <Link to="/categories/men" style={{textDecoration: "none", color: "black"}}>
    <div className="category">
      <img src={menCategory} alt=".." />
      <h3>Men</h3>
    </div>
    </Link>

    <Link to="/categories/women" style={{textDecoration: "none", color: "black"}}>
    <div className="category">
      <img src={womenCategory} alt=".." />
      <h3>Women</h3>
    </div>
    </Link>

    <Link to="/categories/gadget" style={{textDecoration: "none", color: "black"}}>
    <div className="category">
      <img src={gadgetCategory} alt=".." />
      <h3>Gadgets</h3>
    </div>
    </Link>

    </div>
  );
}




