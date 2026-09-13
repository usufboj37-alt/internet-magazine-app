import React, { useEffect, useState } from "react";
import MyNavbar from "../../components/MyNavbar";
import GetUser from "../../functions/GET/GetUser";
import type { Item, Operation } from "../../types";
import GetCart from "../../functions/GET/GetCart";
import GetProducts from "../../functions/GET/GetAllProducts";
import { Pencil, ShoppingBag } from "lucide-react";
import UserNameModal from "../../components/modals/UserNameModal";
import LoginModal from "../../components/modals/LoginModal";
import PasswordModal from "../../components/modals/PasswordModal";
import "../../components/css/ProductPage.css";
import "../../components/css/Profile.css";
import "../../components/css/Modal.css";
import GetUserOp from "../../functions/GET/GetUserOp";
import ProductList from "../../components/products/ProductList";
import "../../components/css/BoughtList.css";
const ProfilePage = () => {
  const [info, setInfo] = useState({
    login: "",
    password: "",
    id: 0,
    user_name: "",
    image: null,
  });

  const [cart, setCart] = useState<Item[]>([]);
  const [page, setPage] = useState("info");
  const [products, setProducts] = useState<Item[]>([]);
  const [userOp, setUserOp] = useState<Operation[]>([]);

  const [namePage, setNamePage] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [passwordPage, setPasswordPage] = useState(false);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetUser();

      if (response.success) {
        setInfo(response.data);
      }
    };

    FetchData();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetCart();

      if (response.success) {
        setCart(response.data);
      }
    };

    FetchData();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetProducts(1, 1000);

      if (response.success) {
        setProducts(response.data.products);
      }
    };

    FetchData();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetUserOp();

      if (response.success) {
        setUserOp(response.data);
      }
    };

    FetchData();
  }, []);

  const operationsBuy = userOp.filter((operation) => operation.type === "buy");

  const boughtProducts = products.filter((product) =>
    operationsBuy.some((operation) => operation.product_id === product.id),
  );

  const user_products: Item[] = products.filter(
    (product) => product.user_id === info.id,
  );

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      rub: "₽",
      usd: "$",
      eur: "€",
    };

    return symbols[currency] ?? currency;
  };

  return (
    <>
      <MyNavbar />

      <div className="profile">
        <section className="profile-header">
          <img
            src={`/${info.image}`}
            alt="profile image"
            className="profile-avatar"
          />

          <div className="profile-name-wrapper">
            <h1 className="profile-name">{info.user_name}</h1>

            <button className="edit-button" onClick={() => setNamePage(true)}>
              <Pencil size={17} />
            </button>
          </div>

          <div className="profile-tabs">
            <button
              className={page === "info" ? "active-tab" : ""}
              onClick={() => setPage("info")}
            >
              My info
            </button>

            <button
              className={page === "items" ? "active-tab" : ""}
              onClick={() => setPage("items")}
            >
              My Items
            </button>

            <button
              className={page === "buy" ? "active-tab" : ""}
              onClick={() => setPage("buy")}
            >
              My bought Items
            </button>
          </div>
        </section>

        {/* MY INFO */}
        {page === "info" && (
          <>
            <section className="profile-info">
              <h2 className="info-title">Account information</h2>

              <div className="info-row">
                <div>
                  <div className="info-label">Login</div>
                  <div className="info-value">{info.login}</div>
                </div>

                <button
                  className="edit-button"
                  onClick={() => setLoginPage(true)}
                >
                  <Pencil size={17} />
                </button>
              </div>

              <div className="info-row">
                <div>
                  <div className="info-label">Password</div>

                  <div className="info-value">
                    {[...info.password].map((_, index) => (
                      <span key={index}>*</span>
                    ))}
                  </div>
                </div>

                <button
                  className="edit-button"
                  onClick={() => setPasswordPage(true)}
                >
                  <Pencil size={17} />
                </button>
              </div>
            </section>

            <section className="cart-section">
              <div className="cart-title">
                <h2>Your cart</h2>
                <span className="cart-count">{cart.length}</span>
              </div>
            </section>
          </>
        )}

        {/* MY ITEMS */}
        {page === "items" && (
          <section className="profile-info" id="items">
            <h2 className="info-title">My Items</h2>

            <div className="products">
              <ProductList products={user_products} />
            </div>
          </section>
        )}

        {/* BOUGHT ITEMS */}
        {page === "buy" && (
          <section className="bought-section">
            <div className="bought-header">
              <div>
                <h2>My bought items</h2>
                <p>All products you have purchased</p>
              </div>

              <div className="bought-count">
                <ShoppingBag size={20} />
                <span>{boughtProducts.length}</span>
              </div>
            </div>

            {boughtProducts.length === 0 ? (
              <div className="empty-bought">
                <ShoppingBag size={55} />

                <h3>No bought items yet</h3>

                <p>Products that you purchase will appear here.</p>
              </div>
            ) : (
              <div className="bought-grid">
                {boughtProducts.map((product) => (
                  <div className="bought-card" key={product.id}>
                    <div className="bought-image-wrapper">
                      <img
                        src={`/${product.image}`}
                        alt={product.name}
                        className="bought-image"
                      />

                      <div className="bought-badge">Purchased</div>
                    </div>

                    <div className="bought-content">
                      <h3 className="bought-name">{product.name}</h3>

                      <p className="bought-description">
                        {product.description}
                      </p>

                      <div className="bought-bottom">
                        <span className="bought-price">
                          {product.price} {getCurrencySymbol(product.currency)}
                        </span>

                        <span className="bought-status">✓ Bought</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* USER NAME MODAL */}
        {namePage && (
          <div className="my-modal-overlay" onClick={() => setNamePage(false)}>
            <UserNameModal />
          </div>
        )}

        {/* LOGIN MODAL */}
        {loginPage && (
          <div className="my-modal-overlay" onClick={() => setLoginPage(false)}>
            <LoginModal />
          </div>
        )}

        {/* PASSWORD MODAL */}
        {passwordPage && (
          <div
            className="my-modal-overlay"
            onClick={() => setPasswordPage(false)}
          >
            <PasswordModal />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
