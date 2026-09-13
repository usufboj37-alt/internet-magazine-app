import type { Item, Wallet } from "../../types";

const CreateWallet = async ({wallet_name,balance,currency}:Wallet) => {
  const response = await fetch("/api/create-wallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
        wallet_name:wallet_name,
        balance:balance,
        currency:currency
    }),
  });

  const data=await response.json()
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default CreateWallet;