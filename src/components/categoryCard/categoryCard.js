import "./categoryCard.css"
import { Link } from "react-router-dom"
import { CategoryData } from "../../categoryData.js"

export function CategoryCard()
{
  return(
    <div className="category-cards">
    
    {CategoryData.map(item => {
      return(
        <Link key={item.categoryName} to={`/categories/${item.categoryName}`} style={{textDecoration: "none", color: "black"}}>
        <div className="category">
          <img src={item.categoryImg} alt=".." />
          <h3>{item.categoryName}</h3>
        </div>
      </Link>
      );
    })}

    </div>
  );
}


