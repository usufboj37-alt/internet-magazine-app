import React from "react";
import type { Item, User } from "../../types";
import { ProductItem } from "./ProductItem";
type Props = {
  products: Item[];
};

const ProductList = ({ products }: Props) => {
  return products.map((product) => <ProductItem Item={product} />);
};

export default ProductList;
