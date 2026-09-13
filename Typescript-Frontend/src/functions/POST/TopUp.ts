
import type { Currency, User } from "../../types";

type TopUp={
    wallet_id:number
    amount:number
    currency:Currency
}



const TopUp = async ({currency,wallet_id,amount}:TopUp) => {
  const response = await fetch("/api/top-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      wallet_id:wallet_id,
      amount:amount,
      currency:currency
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default TopUp;
