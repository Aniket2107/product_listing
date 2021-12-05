import React from "react";
import { ProductType } from "../App";

interface IProps {
  product: ProductType;
}

const Product: React.FC<IProps> = ({ product }) => {
  return (
    <div className="product">
      <img src={product.img} alt="product" />
      <p className="f-b">{product.name}</p>

      <div className="flex m-2">
        <span className="f-b">{product.price}₹</span>
        <span className="brand">{product.brand}</span>
      </div>
      <p>
        Sizes:
        {product.size.map((sz: string) => (
          <span key={sz}> {sz}</span>
        ))}
      </p>
    </div>
  );
};

export default Product;
