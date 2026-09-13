import React, { useContext, useState } from "react";
import type { CartProps } from "../../types";
import { AuthContext } from "../Context";
import { useNavigate } from "react-router-dom";
import WalletSelectModal from "../modals/WalletSelectModal";

const CartsItem = ({ Item }: CartProps) => {
  const { userid } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const simbol =
    {
      rub: "₽",
      eur: "€",
      usd: "$",
    }[Item.currency] ?? "";
  return (
    <>
      <div className="product">
        <img src={`/${Item.image}`} />
        <h2>{Item.name}</h2>
        {Item.quantity > 1 ? (
          <h1>
            <span>{simbol}</span>
            {Item.price * Item.quantity}
          </h1>
        ) : (
          <h1 className="price">
            <span>{simbol}</span>
            {Item.price}
          </h1>
        )}
        <span className="category">{Item.category}</span>
        <h3>{Item.quantity}</h3>
        <p>{Item.description}</p>
        <button className="delete" onClick={() => setIsOpen(true)}>
          Buy
        </button>
      </div>
      {isOpen && (
        <div className="my-modal-overlay" onClick={() => setIsOpen(false)}>
          <WalletSelectModal product_id={Item.product_id} />
        </div>
      )}
    </>
  );
};

export { CartsItem };
