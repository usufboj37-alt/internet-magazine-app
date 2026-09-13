import React, { useContext } from "react";
import "../css/Product.css";
import type { Props } from "../../types";
import { AuthContext } from "../Context";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ Item }: Props) => {
  const simbol =
    {
      rub: "₽",
      eur: "€",
      usd: "$",
    }[Item.currency] ?? "";
  const navigate = useNavigate();
  return (
    <div className="product">
      <img src={`/${Item.image}`} />
      <h2>{Item.name}</h2>
      <h1 className="price">
        <span>{simbol}</span>
        {Item.price}
      </h1>
      <span className="category">{Item.category}</span>
      <p>{Item.description}</p>
      <button
        className="delete"
        onClick={() => navigate(`/product/${Item.id}`)}
      >
        View More
      </button>
    </div>
  );
};

export { ProductItem };
