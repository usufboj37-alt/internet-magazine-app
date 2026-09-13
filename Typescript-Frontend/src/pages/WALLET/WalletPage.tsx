import "../../components/css/WalletPage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Operation, Wallet } from "../../types";
import GetWallet from "../../functions/GET/GetWallet";
import GetOperations from "../../functions/GET/GetOperations";
import MyNavbar from "../../components/MyNavbar";
import TransferModal from "../../components/modals/TransferModal";
import TopUpModal from "../../components/modals/TopUpModal";

const WalletPage = () => {
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tpModal, setTpModal] = useState<boolean>(false);

  const [wallet, setWallet] = useState<Wallet>({
    wallet_name: "",
    id: null,
    balance: 0,
    currency: null,
  });

  const [operations, setOperations] = useState<Operation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetWallet(Number(id));

      if (response.success) {
        setWallet(response.data);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetOperations(Number(id));

      if (response.success) {
        setOperations(response.data);
      }
    };

    fetchData();
  }, [id]);

  const symbol =
    {
      rub: "₽",
      eur: "€",
      usd: "$",
    }[wallet.currency ?? ""] ?? "";

  const getOperationSymbol = (currency: string | null) => {
    return (
      {
        rub: "₽",
        eur: "€",
        usd: "$",
      }[currency ?? ""] ?? ""
    );
  };

  const isNegative = (type: string) => {
    return type === "buy" || type === "from_transfer";
  };

  const getOperationClass = (type: string) => {
    if (type === "buy") {
      return "buy";
    }

    if (type === "transfer") {
      return "transfer-to";
    }

    if (type === "from_transfer") {
      return "transfer-from";
    }

    if (type === "top_up") {
      return "top-up";
    }

    return "";
  };

  const getOperationName = (type: string) => {
    if (type === "buy") {
      return "Buy";
    }

    if (type === "transfer") {
      return "Transfer";
    }

    if (type === "from_transfer") {
      return "Transfer from";
    }

    if (type === "top_up") {
      return "Top Up";
    }

    return type;
  };

  return (
    <>
      <MyNavbar />

      <main className="wallet-page">
        <section className="wallet-card">
          <div className="wallet-info">
            <h1>YOUR WALLET</h1>

            <div className="wallet-name">{wallet.wallet_name}</div>

            <div className="wallet-balance">
              {wallet.balance.toFixed(1)} {symbol}
            </div>

            <div style={{ display: "flex" }}>
              <button
                className="transfer-button"
                onClick={() => setIsOpen(true)}
              >
                <span className="transfer-icon">↗</span>
                Transfer
              </button>

              <button
                className="top-up-button"
                onClick={() => setTpModal(true)}
              >
                <span className="transfer-icon">+</span>
                Top Up
              </button>
            </div>
          </div>
        </section>

        <section className="operations-section">
          <h2>Operations</h2>

          <p>Your recent wallet transactions</p>

          {operations.length === 0 ? (
            <div className="operations-list">
              <div className="no-operations">No operations yet</div>
            </div>
          ) : (
            <div className="operations-list">
              {operations.map((operation, index) => {
                const negative = isNegative(operation.type);

                const amount = negative
                  ? -Math.abs(operation.amount)
                  : Math.abs(operation.amount);

                const operationSymbol = getOperationSymbol(operation.currency);

                return (
                  <div
                    className={`operation ${getOperationClass(operation.type)}`}
                    key={operation.id ?? index}
                  >
                    <div className="operation-icon">
                      {operation.type === "buy"
                        ? "🛒"
                        : operation.type === "transfer"
                          ? "→"
                          : operation.type === "from_transfer"
                            ? "←"
                            : operation.type === "top_up"
                              ? "+"
                              : "?"}
                    </div>

                    <div className="operation-info">
                      <p className="operation-type">
                        {getOperationName(operation.type)}
                      </p>

                      <p className="operation-date">Wallet operation</p>
                    </div>

                    <div className="operation-right">
                      <p
                        className={`operation-amount ${
                          amount < 0 ? "negative" : "positive"
                        }`}
                      >
                        {amount > 0 ? "+" : ""}
                        {amount} {operationSymbol}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {isOpen && (
        <div className="my-modal-overlay" onClick={() => setIsOpen(false)}>
          <TransferModal from_wallet_id={wallet.id} />
        </div>
      )}

      {tpModal && (
        <div className="my-modal-overlay" onClick={() => setTpModal(false)}>
          <TopUpModal wallet_id={wallet.id} />
        </div>
      )}
    </>
  );
};

export default WalletPage;
