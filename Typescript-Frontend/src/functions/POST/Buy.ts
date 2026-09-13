import type { Item } from "../../types";

const Buy = async (wallet_name:string,product_id:number) => {
  const response = await fetch("/api/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
        wallet_name:wallet_name,
        product_id:product_id
    }),
  });

  const data=await response.json()
  console.log(product_id)
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default Buy;