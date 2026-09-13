import React, { useState } from "react";
import UpdateUser from "../../functions/UpdateUser";
import { useNavigate } from "react-router-dom";

const UserNameModal = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const handleUpdate = async () => {
    const response = await UpdateUser(userName);

    if (response.success) {
      navigate("/profile");
    }
  };
  return (
    <div className="my-modal" onClick={(e) => e.stopPropagation()}>
      <h1>Enter new User name</h1>
      <input
        type="text"
        placeholder="User name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleUpdate}>Enter</button>
    </div>
  );
};

export default UserNameModal;
