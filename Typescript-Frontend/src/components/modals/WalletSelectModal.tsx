import { useEffect, useState } from "react";
import GetWallets from "../../functions/GET/GetWallets";
import type { Wallet } from "../../types";
import Buy from "../../functions/POST/Buy";
import { useNavigate } from "react-router-dom";

type Props = {
  product_id: number;
};

const WalletSelectModal = ({ product_id }: Props) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetWallets();

      if (response.success) {
        setWallets(response.data);
      }
    };

    fetchData();
  }, []);

  const handleSelectWallet = async (wallet: Wallet) => {
    const response = await Buy(wallet.wallet_name, product_id);

    if (response.success) {
      navigate("/wallets");
    }
  };

  return (
    <div className="my-modal">
      <h1>Select wallet</h1>

      {wallets.map((wallet) => (
        <div className="wallet-card">
          <div className="wallet-card-content">
            <h2>{wallet.wallet_name}</h2>

            <div className="wallet-balance">{wallet.balance.toFixed(1)}</div>

            <span className="wallet-currency">{wallet.currency}</span>

            <button
              className="wallet-button"
              onClick={() => handleSelectWallet(wallet)}
            >
              Select
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletSelectModal;
