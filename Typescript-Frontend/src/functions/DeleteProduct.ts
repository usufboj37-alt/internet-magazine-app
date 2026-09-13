import type { Item } from "../types";

const DeleteProduct = async (id:number) => {
  const response = await fetch("/api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
        id:id,
    }),
  });

  const data=await response.json()
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default DeleteProduct;