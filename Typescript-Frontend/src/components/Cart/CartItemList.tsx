import React from "react";
import type { CartItem, CartProps, Item, User } from "../../types";
import { ProductItem } from "../products/ProductItem";
import { CartsItem } from "./CartItem";
type Products = CartItem[];

type Props = {
  products: Products;
};

const CartList = ({ products }: Props) => {
  return products.map((product) => <CartsItem Item={product} />);
};

export default CartList;
