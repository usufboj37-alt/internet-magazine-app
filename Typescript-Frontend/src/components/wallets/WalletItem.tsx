import React from "react";
import type { Wallet } from "../../types";
import { useNavigate } from "react-router-dom";

const WalletItem = ({ wallet_name, currency, balance,id }: Wallet) => {
  const navigate=useNavigate()
  return (
    <div className="wallet-card">
      <div className="wallet-card-content">
        <h2>{wallet_name}</h2>
        <div className="wallet-balance">{balance}</div>

        <span className="wallet-currency">{currency}</span>

        <button className="wallet-button" onClick={()=>navigate(`/wallet/${id}`)}>See more</button>
      </div>
    </div>
  );
};

export default WalletItem;
