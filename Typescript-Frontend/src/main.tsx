import { StrictMode, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AuthContext } from "./components/Context.ts";
import { WebSocketContext } from "./components/Contexts/WebSocketContext.tsx";
import "./css/index.css";
import { WebSocketProvider } from "./components/Contexts/WebSocketContext.tsx";
import LoginPage from "./pages/PAGE/LoginPage.tsx";
import MainPage from "./pages/PAGE/MainPage.tsx";
import CreatePage from "./pages/CREATE/CreatePage.tsx";
import CreateProductPage from "./pages/CREATE/CreatePrPage.tsx";
import ProductPage from "./pages/PAGE/ProductPage.tsx";
import CartPage from "./pages/PAGE/CartPage.tsx";
import ProfilePage from "./pages/PAGE/ProfilePage.tsx";
import WalletsPage from "./pages/WALLET/WalletsPage.tsx";
import WalletPage from "./pages/WALLET/WalletPage.tsx";
import AllChatsPage from "./pages/CHATS/AllChatsPage.tsx";

import GetUser from "./functions/GET/GetUser.ts";
import Refresh from "./functions/POST/Refresh.ts";
import ChatPage from "./pages/CHATS/ChatPage.tsx";
import UserPage from "./pages/PAGE/UserPage.tsx";

const Root = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userid, setUserId] = useState<number>(0);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetUser();

      if (response.success) {
        setIsAuth(true);
        setUserId(response.data.id);
      } else {
        setIsAuth(false);
      }
    };

    FetchData();
  }, []);

  const handleRefresh = async () => {
    const response = await Refresh();

    if (response.success) {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    if (isAuth === false) {
      handleRefresh();
    }
  }, [isAuth]);

  if (isAuth === null) {
    return <h1>Loading</h1>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        userid,
        setIsAuth,
      }}
    >
      <WebSocketProvider>
        <BrowserRouter>
          {isAuth === true ? (
            <Routes>
              <Route path="/main" element={<MainPage />} />
              <Route path="/product" element={<CreateProductPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/wallets" element={<WalletsPage />} />
              <Route path="/chats" element={<AllChatsPage />} />
              <Route path="/wallet/:id" element={<WalletPage />} />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/chat/:chat_id/:receiver_id" element={<ChatPage />} />
              <Route path="*" element={<Navigate to="/main" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create" element={<CreatePage />} />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </BrowserRouter>
      </WebSocketProvider>
    </AuthContext.Provider>
  );
};

createRoot(document.getElementById("root")!).render(
  
    <Root />
  
);
