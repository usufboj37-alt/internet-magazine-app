import React, { useState } from "react";
import UpdateUser from "../../functions/UpdateUser";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [Login, setLogin] = useState("");
  const navigate = useNavigate();
  const handleUpdate = async () => {
    const response = await UpdateUser(null, Login, null);

    if (response.success) {
      navigate("/profile");
    }
  };
  return (
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-form">
      <h1>Enter new Login</h1>
      <input
        type="text"
        placeholder="Login"
        value={Login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <button onClick={handleUpdate}>Enter</button>
      </div>
    </div>
  );
};

export default LoginModal;
