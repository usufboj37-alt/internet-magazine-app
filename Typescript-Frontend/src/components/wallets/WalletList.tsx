import React from "react";
import type { Wallet } from "../../types";
import WalletItem from "./WalletItem";

type Props = {
  wallets: Wallet[];
};

const WalletList = ({ wallets }: Props) => {
  return (
    <div className="wallets-container">
      {wallets.map((wallet) => (
        <WalletItem
          wallet_name={wallet.wallet_name}
          currency={wallet.currency}
          balance={Number(wallet.balance.toFixed(1))}
          id={wallet.id}
        />
      ))}
    </div>
  );
};

export default WalletList;
