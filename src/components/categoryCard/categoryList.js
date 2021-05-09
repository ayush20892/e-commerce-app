import "./categoryList.css"
import { CategoryData } from "../../categoryData1.js"
import { useNavigate, useParams } from "react-router-dom"

export function CategoryList(){
  const navigate = useNavigate()
  const {categoryName} = useParams()
  const itemList1 = CategoryData[categoryName]
  return(
    <div className="category">
      <div className="header">
        <h2>C A T E G O R I E S</h2>
        <h3>{categoryName.toUpperCase()}</h3>
      </div>
      <div className="category-list">
          {itemList1.map(item => (
            <div key={item.id} onClick={() => navigate(`/${categoryName}/${item.page}`)} className="category-item">
              <img src={item.img} alt=".." />
              <div className="category-detail">
                <h4>{item.name.toUpperCase()}</h4>
              </div>
            </div>
          ))}
    </div>
  </div>
  );
}