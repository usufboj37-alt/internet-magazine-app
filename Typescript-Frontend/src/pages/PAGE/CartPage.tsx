import React, { useEffect, useState } from "react";
import type { CartItem } from "../../types";
import GetCart from "../../functions/GET/GetCart";
import MyNavbar from "../../components/MyNavbar";
import CartList from "../../components/Cart/CartItemList";
const CartPage = () => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetCart();

      if (response.success) {
        setProducts(response.data);
      }

      if (!response.success) {
        setError("Cart Items not Found");
      }
    };

    FetchData();
  }, []);
  if (!products) {
    setError("Cart Items not found");
  }
  return (
    <>
      <MyNavbar />
      {error && (
        <h1 style={{ color: "black", textAlign: "center" }}>{error}</h1>
      )}
      <div className="products">
        <CartList products={products} />
      </div>
    </>
  );
};

export default CartPage;
