import React, { useState } from "react";
import UpdateUser from "../../functions/UpdateUser";
import { useNavigate } from "react-router-dom";

const PasswordModal = () => {
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUpdate = async () => {
    const response = await UpdateUser(null, null, Password);

    if (response.success) {
      navigate("/profile");
    }
  };
  return (
    <div className="my-modal" onClick={(e) => e.stopPropagation()}>
      <h1>Enter new Password</h1>
      <input
        type="text"
        placeholder="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleUpdate}>Enter</button>
    </div>
  );
};

export default PasswordModal;
