import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types";
import CreateUser from "../../functions/CREATE/CreateAccount";
import "../../components/css/Login.css"
const CreatePage = () => {
  const [info, setInfo] = useState<User>({
    login: "",
    password: "",
    user_name: "",
    image: null,
    id: null,
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    const response = await CreateUser(info);

    if (response.success) {
      navigate("/login");
    }
    if (!response.success) {
      setError(response.data.detail);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Create Account</h1>
        <label htmlFor="">UserName</label>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your UserName"
            value={info.user_name}
            onChange={(e) => setInfo({ ...info, user_name: e.target.value })}
          />
          <div>
            <label htmlFor="">Login</label>
          </div>
          <input
            type="text"
            placeholder="Enter your login"
            value={info.login}
            onChange={(e) => setInfo({ ...info, login: e.target.value })}
          />
          <div>
            <label htmlFor="">Password</label>
          </div>
          <input
            type="password"
            placeholder=" enter your password"
            value={info.password}
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
          />

          <div>
            <label htmlFor="">Logo</label>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setInfo({ ...info, image: e.target.files?.[0] })}
          />
        </div>
        <div className="buttons">
          <button className="login-btn" onClick={handleCreate}>
            Enter
          </button>
          <button className="create-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
