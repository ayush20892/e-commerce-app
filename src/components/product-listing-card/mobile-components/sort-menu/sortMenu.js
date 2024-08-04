import React from "react";
import "./sortMenu.css";
import { useProduct } from "../../../../context/productContext";

export function SortMenu() {
  const { setShowSortMenu, stateProduct, dispatchProduct } = useProduct();

  const sortByList = ["HIGH-TO-LOW", "LOW-TO-HIGH"];

  return (
    <div className="sort-page" onClick={() => setShowSortMenu(false)}>
      <ul className="sort-page-list">
        <li className="sort-page-list-heading">Sort By</li>
        {sortByList.map((listItem) => (
          <li
            style={{
              color: `${stateProduct.sortby === listItem ? "#ff8243" : "#000"}`,
              fontWeight: `${
                stateProduct.sortby === listItem ? "bold" : "400"
              }`,
            }}
            className={`sort-page-list-item `}
            onClick={() => dispatchProduct({ type: "SORT", payload: listItem })}
            key={listItem}
          >
            {listItem}
          </li>
        ))}
        <button
          onClick={() => {
            dispatchProduct({ type: "RESET" });
            window.location.reload();
          }}
        >
          Reset
        </button>
      </ul>
    </div>
  );
}
