import type { User } from "../../types";

const AddToCart = async (id:number) => {
  const response = await fetch("/api/add-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
        product_id:id,
    }),
  });

  const data=await response.json()
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default AddToCart;