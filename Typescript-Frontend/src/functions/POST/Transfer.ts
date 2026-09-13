import type { User } from "../../types";

type Props={
    from_wallet_id:number
    to_wallet_id:number
    amount:number
}

type Prop={
    info:Props
}

const Transfer = async ({info}:Prop) => {
  const response = await fetch("/api/transfer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      from_wallet_id:info.from_wallet_id,
      to_wallet_id:info.to_wallet_id,
      amount:info.amount
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default Transfer;
