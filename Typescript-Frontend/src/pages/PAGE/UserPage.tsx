import React, { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import type { Item, tGetUser } from "../../types";
import GetUserById from "../../functions/POST/GetUserById";
import MyNavbar from "../../components/MyNavbar";
import ProductList from "../../components/products/ProductList";
import GetProducts from "../../functions/GET/GetAllProducts";

const UserPage = () => {
  const { id } = useParams();

  const [user, setUser] = useState<tGetUser>({
    id: 0,
    user_name: "",
    image: "",
    login: "",
    password: "",
  });

  const [Products, setProducts] = useState<Item[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetUserById(Number(id));

      if (response.success) {
        setUser(response.data);
      }
    };

    FetchData();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetProducts(1, 100000000);

      if (response.success) {
        setProducts(response.data.products);
      }
    };
    FetchData();
  }, []);

  const userProducts = Products.filter(
    (product) => product.user_id === Number(id),
  );

  return (
    <>
      <MyNavbar />
      <div>
        <div className="profile">
          <section className="profile-header">
            <img
              src={`/${user.image}`}
              alt="profile image"
              className="profile-avatar"
            />

            <div className="profile-name-wrapper">
              <h1 className="profile-name">{user.user_name}</h1>
            </div>

            <div className="profile-tabs">
              <button className="active-tab">Items</button>
            </div>
            <section className="profile-info" id="items">
              <h2 className="info-title">{user.user_name}'s Items</h2>

              <div className="products">
                <ProductList products={userProducts} />
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default UserPage;
