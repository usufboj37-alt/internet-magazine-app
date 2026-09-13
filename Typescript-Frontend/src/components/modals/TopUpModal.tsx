import React, { useState } from "react";
import type { Currency } from "../../types";
import TopUp from "../../functions/POST/TopUp";
import { useNavigate } from "react-router-dom";

type Props={
    wallet_id:number
}

const TopUpModal = ({wallet_id}:Props) => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>("rub");
  const navigate=useNavigate()
  const handleTopUp=async()=>{
    const response=await TopUp({currency,wallet_id,amount})

    if(response.success){
        navigate('/wallets')
    }
  }

  return (
    <div className="my-modal" onClick={(e) => e.stopPropagation()}>
      <h1>Top Up</h1>
      <label htmlFor="">Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
      >
        <option value="usd">Usd</option>
        <option value="rub">Rub</option>
        <option value="eur">Eur</option>
      </select>
      <button onClick={handleTopUp}>Enter</button>
    </div>
  );
};

export default TopUpModal;
