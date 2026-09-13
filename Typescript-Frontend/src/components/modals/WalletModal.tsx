import React, { useState } from "react";
import type { Currency, Wallet } from "../../types";
import CreateWallet from "../../functions/CREATE/CreateWallet";
import '../css/Wallet.css'
const WalletModal = () => {
  const [info, setInfo] = useState<Wallet>({
    wallet_name:'',
    currency:'rub',
    balance:null,
    id:null
  });

  const handleWallet = async () => {
    const response = await CreateWallet(info);
  };
  return (
    <div className="my-modal" onClick={(e) => e.stopPropagation()}>
      <h1>Create Wallet</h1>
      <label>Wallet name</label>
      <input
        type="text"
        placeholder="Enter wallet name"
        value={info.wallet_name}
        onChange={(e) => setInfo({ ...info, wallet_name: e.target.value })}
      />
      <label>Balance</label>
      <input
        type="text"
        placeholder="Enter Balance"
        value={info.balance}
        onChange={(e) => setInfo({ ...info, balance: Number(e.target.value) })}
      />
      <label>Currency</label>
      <select
        value={info.currency}
        onChange={(e) =>
          setInfo({
            ...info,
            currency: e.target.value as Currency,
          })
        }
      >
        <option value="usd">Usd</option>
        <option value="rub">Rub</option>
        <option value="eur">Eur</option>
      </select>
      <button onClick={handleWallet}>Enter</button>
    </div>
  );
};

export default WalletModal;
