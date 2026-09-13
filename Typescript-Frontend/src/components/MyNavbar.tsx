import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../functions/POST/Logout";
import GetUser from "../functions/GET/GetUser";
import { AuthContext } from "./Context";
const MyNavbar = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    const response = await Logout();

    if (response.success) {
      setIsAuth(false);
      navigate("/login");
    }
  };
  useEffect(() => {
    const FetchData = async () => {
      const response = await GetUser();

      if (response.success) {
        setImage(response.data.image);
      }
    };
    FetchData();
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* <a className="navbar-brand p-0" href="/main">
            <img src='' alt="icon" width="200px" />
          </a> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/main">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  Create Item
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Your Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wallets">
                  Your wallets
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chats">
                  Your Chats
                </Link>
              </li>
            </ul>
            <div className="ms-auto">
              <button
                className="btn btn-outline-light"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <li className="nav-item">
          <a href="/profile">
            <img
              src={`/${image}`}
              alt="profile image"
              style={{
                width: "60px",
                borderRadius: "50%",
                marginRight: "30px",
              }}
            />
          </a>
        </li>
      </nav>
    </div>
  );
};

export default MyNavbar;
