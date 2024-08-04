import "./footer.css";
import { BiSort, BiFilterAlt } from "react-icons/bi";
import { useProduct } from "../../context/productContext";

export function ProductFooter() {
  const { setShowSortMenu, setShowFilterMenu } = useProduct();
  return (
    <footer>
      <div className="product-item">
        <div className="sort-item" onClick={() => setShowSortMenu(true)}>
          <BiSort style={{ fontSize: "1.2rem" }} />
          Sort
        </div>
        <div className="filter-item" onClick={() => setShowFilterMenu(true)}>
          <BiFilterAlt style={{ fontSize: "1.2rem" }} />
          Filter
        </div>
      </div>
    </footer>
  );
}
