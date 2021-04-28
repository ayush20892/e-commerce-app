import "./categoryList.css"
import { MenData } from "../../menData.js"
import { CategoryData } from "../../categoryData.js"
import { useNavigate, useParams } from "react-router-dom"

export function CategoryList(){
  const navigate = useNavigate()
  const {categoryName} = useParams()
  const itemList = Object.entries(CategoryData[categoryName])
  console.log(itemList)
  return(
    <div className="category">
      <div className="header">
        <h2>C A T E G O R I E S</h2>
        <h3>{categoryName.toUpperCase()}</h3>
      </div>
      <div className="category-list">
          {itemList.map(item => (
            <div onClick={() => navigate(`/${categoryName}/${item[0]}`)} className="category-item">
              <img src={item[1]} alt=".." />
              <div className="category-detail">
                <h4>{item[0].toUpperCase()}</h4>
              </div>
            </div>
          ))}
    </div>
  </div>
  );
}


// onClick={() => navigate(`/${categoryName}/${item}`)}