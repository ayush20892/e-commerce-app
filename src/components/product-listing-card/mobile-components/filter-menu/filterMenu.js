import React from "react";
import "./filterMenu.css";
import { useProduct } from "../../../../context/productContext";

export function FilterMenu() {
  const { setShowFilterMenu, stateProduct, dispatchProduct } = useProduct();

  return (
    <div className="sort-page" onClick={() => setShowFilterMenu(false)}>
      <ul className="sort-page-list">
        <li className="sort-page-list-heading">Filter Options</li>
        <li className={`sort-page-list-item `}>
          <input
            value={stateProduct.outOfStock}
            name="choice"
            type="checkbox"
            checked={stateProduct.outOfStock}
            onChange={() => dispatchProduct({ type: "TOGGLE-STOCK" })}
          />{" "}
          <span>Include Out of Stock</span>
        </li>
        <li className={`sort-page-list-item `}>
          <input
            value={stateProduct.fastDelivery}
            name="choice"
            type="checkbox"
            checked={stateProduct.fastDelivery}
            onChange={() => dispatchProduct({ type: "TOGGLE-DELIVERY" })}
          />{" "}
          <span>Fast delivery Only</span>
        </li>
        <button
          onClick={() => {
            dispatchProduct({ type: "RESET" });
          }}
        >
          Reset
        </button>
      </ul>
    </div>
  );
}
