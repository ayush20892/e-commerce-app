import "./footer.css";
import { BiSort, BiFilterAlt } from "react-icons/bi";


export function ProductFooter(){
  return(
    <footer>
      <div className="product-item">
        <div className="sort-item">
          <BiSort style={{fontSize: "1.2rem"}}/>
          Sort
        </div>
        <div className="filter-item">
          <BiFilterAlt style={{fontSize: "1.2rem"}}/>
          Filter
        </div>
      </div>
    </footer>
  );
}