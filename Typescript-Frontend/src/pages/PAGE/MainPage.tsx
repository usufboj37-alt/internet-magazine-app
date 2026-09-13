import React, { useContext, useEffect, useState } from "react";
import ProductList from "../../components/products/ProductList";
import { AuthContext } from "../../components/Context";
import type { Item } from "../../types";
import MyNavbar from "../../components/MyNavbar";
import type { Category } from ".././CREATE/CreatePrPage";
import "../../components/css/MainPage.css";
import DeleteProduct from "../../functions/DeleteProduct";
import GetProducts from "../../functions/GET/GetAllProducts";
const MainPage = () => {
  const [products, setProducts] = useState<Item[]>([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Category>("All");
  const { isAuth, userid, setIsAuth } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const removeProduct = async (id: number) => {
    const response = await DeleteProduct(id);

    if (!response.success) {
      setError(response.data.detail);
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetProducts(page, 10);

      if (response.success) {
        setProducts(response.data.products);
        setTotalPages(response.data.total_pages);
      }
    };
    FetchData();
  }, [page]);

  if (page < 1) {
    setPage(1);
  }

  const filteredProducts = products.filter((product) => {
    return (
      (filter === "All" || product.category === filter) &&
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="main-page">
      <MyNavbar />
      <h1 className="page-title">products</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Category)}
        >
          <option value="All" selected>
            All
          </option>
          <option value="Food">Food</option>
          <option value="Electronic">Electronic</option>
          <option value="Clothing">Clothing</option>
          <option value="Sports">Sports</option>
          <option value="books">Books</option>
          <option value="Home">Home</option>
        </select>
      </div>
      <div className="products">
        <ProductList products={filteredProducts} />
      </div>
      {page <= totalPages ? (
        <div>
          <span
            onClick={() => setPage(page - 1)}
            style={{ float: "left", fontSize: "25px" }}
          >
            {" "}
            &lt;-- previous page
          </span>
          <span
            onClick={() => setPage(page + 1)}
            style={{ float: "right", fontSize: "25px" }}
          >
            next page --&gt;
          </span>
        </div>
      ) : (
        <div>
          <h1>Products not found</h1>
          <span
            onClick={() => setPage(page - 1)}
            style={{ float: "left", fontSize: "25px" }}
          >
            {" "}
            &lt;-- previous page
          </span>
        </div>
      )}
    </div>
  );
};

export default MainPage;
