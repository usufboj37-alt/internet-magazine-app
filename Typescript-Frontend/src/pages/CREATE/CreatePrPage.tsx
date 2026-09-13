import React, { useState } from "react";
import type { Item } from "../../types";
import MyNavbar from "../../components/MyNavbar";
import "../../components/css/CreateProduct.css";
import CreateProduct from "../../functions/CREATE/CreateProduct";
import type { Category, Currency } from "../../types";
import type { CreateItem } from "../../types";
import { useNavigate } from "react-router-dom";
const CreateProductPage = () => {
  const [info, setInfo] = useState<CreateItem>({
    name: "",
    price: null,
    category: "Home",
    image: null,
    description: "",
    currency: "rub",
    quantity: 1,
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate=useNavigate()

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", info.name);
    formData.append("price", info.price.toString());
    formData.append("category", info.category);
    formData.append("description", info.description);
    formData.append("currency", info.currency);
    formData.append("quantity", info.quantity.toString());
    if (info.image) {
      formData.append("image", info.image);
    }

    const response = await fetch("/api/create-product", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if(response.ok){
      navigate('/products')
    }

    console.log(response.status);
    console.log(await response.text());
  };

  return (
    <>
      <MyNavbar />
      <div className="create-page">
        <div className="create-card">
          <h1>Create Product</h1>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Price"
              value={info.price}
              onChange={(e) =>
                setInfo({ ...info, price: Number(e.target.value) })
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={info.description}
              onChange={(e) =>
                setInfo({ ...info, description: e.target.value })
              }
            />
            <select
              value={info.category}
              onChange={(e) =>
                setInfo({
                  ...info,
                  category: e.target.value as Category,
                })
              }
            >
              <option value="Food">Food</option>
              <option value="Electronic">Electronic</option>
              <option value="Clothing">Clothing</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
            </select>

            <select
              value={info.currency}
              onChange={(e) =>
                setInfo({
                  ...info,
                  currency: e.target.value as Currency,
                })
              }
            >
              <option value="rub">Rub</option>
              <option value="eur">Eur</option>
              <option value="usd">Usd</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setInfo({ ...info, image: e.target.files?.[0] })}
            />
            <div>
              <label htmlFor="">Quantity</label>
            </div>
            <input
              type="number"
              value={info.quantity}
              onChange={(e) =>
                setInfo({ ...info, quantity: Number(e.target.value) })
              }
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Enter
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </div>
    </>
  );
};

export default CreateProductPage;
export type { Category };
