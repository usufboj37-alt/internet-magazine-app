import type { User, Wallet } from "../../types";
import type { Currency } from "../../types";
const GetWallet = async (id:number) => {
  const response = await fetch(`/api/wallet?wallet_id=${id}`, {
    method: "GET",
    credentials: "include",
    
  });
  const data:Wallet = await response.json();


  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default GetWallet;
