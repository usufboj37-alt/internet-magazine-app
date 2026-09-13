import React, { useEffect, useState } from "react";
import GetWallets from "../../functions/GET/GetWallets";
import type { Wallet } from "../../types";
import Transfer from "../../functions/POST/Transfer";
import { useNavigate } from "react-router-dom";

type Props = {
  from_wallet_id: number;
};

const TransferModal = ({ from_wallet_id }: Props) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [amount, setAmount] = useState<number>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const FetchData = async () => {
      const response = await GetWallets();

      if (response.success) {
        setWallets(response.data);
      }
    };
    FetchData();
  }, []);

  const otherWallets=wallets.filter(wallet=>wallet.id!=from_wallet_id)

  return (
    <div className="tmy-modal" onClick={(e) => e.stopPropagation()}>
      <div className="wallets-container">
        {otherWallets.map((wallet) => (
          <div className="wallet-card">
            <div className="wallet-card-content">
              <h2>{wallet.wallet_name}</h2>

              <div className="wallet-balance">{wallet.balance.toFixed(1)}</div>

              <span className="wallet-currency">{wallet.currency}</span>

              <button
                className="wallet-button"
                onClick={() => {
                  const Fetch = async () => {
                    const response = await Transfer({
                      info: {
                        from_wallet_id: from_wallet_id,
                        to_wallet_id: wallet.id,
                        amount: amount,
                      },
                    });
                    if (response.success) {
                      navigate("/wallets");
                    }
                  };
                  Fetch();
                }}
              >
                Select
              </button>
            </div>{" "}
            <br />
          </div>
        ))}
      </div>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
    </div>
  );
};

export default TransferModal;
