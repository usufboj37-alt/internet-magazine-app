import type { Item } from "../../types";

const CreateProduct = async ({name,price,category,user_id}:Item) => {
  const response = await fetch("/api/create-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
        name:name,
        price:price,
        category:category
    }),
  });

  const data=await response.json()
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default CreateProduct;