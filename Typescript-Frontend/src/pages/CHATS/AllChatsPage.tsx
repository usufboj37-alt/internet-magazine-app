import React, { useEffect, useState } from "react";
import GetChats from "../../functions/MESSAGES/GetChats";
import type { tGetChat } from "../../types";
import { useNavigate } from "react-router-dom";
import MyNavbar from "../../components/MyNavbar";

const AllChatsPage = () => {
  const [chats, setChats] = useState<tGetChat[]>([]);
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetChats();

      console.log(response.data);

      if (response.success) {
        setChats(response.data);
      }

      if (!response.success) {
        setError(true);
      }
    };
    FetchData();
  }, []);

  return (
    <div className="chats-page">
      <MyNavbar />

      {error && <h1>Chats not found</h1>}

      <div className="chats-container">
        {chats.map((chat) => (
          <div
            className="chat"
            key={chat.id}
            onClick={() => navigate(`/chat/${chat.id}/${chat.user.id}`)}
          >
            <img src={`/${chat.user.image}`} />

            <div className="chat-info">
              <h1>{chat.user.user_name}</h1>
              <h2>{chat.last_message.text}</h2>
            </div>

            <p>{chat.last_message.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllChatsPage;
