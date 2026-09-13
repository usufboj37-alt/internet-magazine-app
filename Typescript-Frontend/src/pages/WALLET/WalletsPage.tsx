import React, { useEffect, useState } from "react";
import type { Wallet } from "../../types";
import GetWallets from "../../functions/GET/GetWallets";
import WalletList from "../../components/wallets/WalletList";
import "../../components/css/WalletsPage.css";
import WalletModal from "../../components/modals/WalletModal";
import MyNavbar from "../../components/MyNavbar";
const WalletsPage = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    const FetchData = async () => {
      const response = await GetWallets();

      if (response.success) {
        setWallets(response.data);
      }
      if (!response.success) {
        setError(true);
      }
    };
    FetchData();
  }, []);
  return (
    <>
      <MyNavbar />
      <button className="plus-button" onClick={() => setIsOpen(true)}>
        <span className="plus-icon"></span>
      </button>
      <div>
        {error && (
          <div>
            <h1 style={{ textAlign: "center" }}>Wallets not found</h1>
          </div>
        )}
        <WalletList wallets={wallets} />
        {isOpen && (
          <div className="my-modal-overlay" onClick={() => setIsOpen(false)}>
            <WalletModal />
          </div>
        )}
      </div>
    </>
  );
};

export default WalletsPage;
