import "./productPageCard.css";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaTape } from "react-icons/fa";
import { VscJersey } from "react-icons/vsc";
import { GrEmoji } from "react-icons/gr";

export function ProductPageCard({ product }) {
  return (
    <div className="product-page">
      <div>
        <span>
          <AiOutlineShareAlt />
        </span>
        <img src={product.image} alt=".." />
      </div>
      <div className="product-detail">
        <h4>{product.name}</h4>
        <h5>Rs {product.price}</h5>
      </div>
      <hr />
      <h4 style={{ marginLeft: "1rem", marginBottom: "1rem" }}>Select Size</h4>
      <div className="size-chart">
        <div>S</div>
        <div>M</div>
        <div>L</div>
        <div>XL</div>
        <div>2XL</div>
        <div>3XL</div>
      </div>
      <hr className="divide-hr" />
      <div className="product-extra-detail">
        <div className="product-type">
          <FaTape style={{ fontSize: "2.5rem" }} />
          <div>
            <h4>Regular Fit</h4>
            <h5>Fits just right - not too tight, not too loose.</h5>
          </div>
        </div>
        <div className="product-type">
          <VscJersey style={{ fontSize: "2.5rem" }} />
          <div>
            <h4>Single Jersey, 100% Cotton</h4>
            <h5>Classic, lightweight jersey fabric comprising 100% cotton.</h5>
          </div>
        </div>
        <div className="product-type">
          <GrEmoji style={{ fontSize: "2.5rem" }} />
          <div>
            <h4>15 DAY RETURNS</h4>
            <h5>Easy returns upto 15 days of delivery.</h5>
          </div>
        </div>
      </div>
      <hr className="divide-hr" />
    </div>
  );
}
