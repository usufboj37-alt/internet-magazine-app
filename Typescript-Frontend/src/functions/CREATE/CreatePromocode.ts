import type { Item, Wallet,Promocode } from "../../types";

type Props={
    code:string
    sale:number
    productId:number
}

const CreatePromocode = async ({code,sale,productId}:Props) => {
  const response = await fetch("/api/create-promocode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
        code:code,
        sale:sale,
        productId:productId
    }),
  });

  const data=await response.json()
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default CreatePromocode;