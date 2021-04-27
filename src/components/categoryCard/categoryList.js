import "./categoryList.css"
import { MenData } from "../../menData.js"
import { useNavigate, useParams } from "react-router-dom"

export function CategoryList(){
  const navigate = useNavigate()
  const {categoryName} = useParams()
  const itemList = Object.keys(MenData.[categoryName])
  return(
    <div className="category-list">
      <ul class="list-non-bullets">
        {itemList.map(item => (
          <li onClick={() => navigate(`/${categoryName}/${item}`)} class="list-item list-with-border">{item}</li>
        ))}
    </ul>
    </div>
  );
}