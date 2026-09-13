import { useContext, useState } from "react";
import "../../components/css/Login.css"
import { useNavigate } from "react-router-dom";
import Login from "../../functions/POST/Login";
import type { User } from "../../types";
import { AuthContext } from "../../components/Context";

function LoginPage() {
  const [info, setInfo] = useState<User>({
    login: "",
    password: "",
    id: null,
    user_name: "",
    image: null,
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const { isAuth, setIsAuth } = useContext(AuthContext);

  async function handleLogin() {
    const response = await Login(info);

    if (response.success) {
      navigate("/main");
      setIsAuth(true);
    }
    if (!response.success) {
      setError(response.data.detail);
    }
  }
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="login"
            value={info.login}
            onChange={(e) => setInfo({ ...info, login: e.target.value })}
          />{" "}
          <br />
          <input
            type="password"
            placeholder="password"
            value={info.password}
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
          />{" "}
          <br />
        </div>
        <div className="buttons">
          <button className="login-btn" onClick={handleLogin}>
            Enter
          </button>
          <button className="create-btn" onClick={() => navigate("/create")}>
            Create Account
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
