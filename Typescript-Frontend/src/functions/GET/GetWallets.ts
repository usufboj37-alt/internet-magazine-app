import type { User, Wallet } from "../../types";

const GetWallets = async () => {
  const response = await fetch(`/api/wallets`, {
    method: "GET",
    credentials: "include",
    
  });
  const data:Wallet[] = await response.json();
  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default GetWallets;
