import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import GetMessages from "../../functions/MESSAGES/GetMessages";
import type { Message, tGetUser, User } from "../../types";
import { useWebSocket } from "../../components/Contexts/WebSocketContext";
import MyNavbar from "../../components/MyNavbar";
import "../../components/css/Chats.css";
import "../../components/css/Chat.css";
import GetUser from "../../functions/GET/GetUser";
import GetUserById from "../../functions/POST/GetUserById";
const ChatPage = () => {
  const { chat_id, receiver_id } = useParams();

  const [text, setText] = useState<string>("");

  const navigate=useNavigate()

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<tGetUser>({
    login: "",
    password: "",
    id: null,
    user_name: "",
    image: "",
  });
  const [otherUser, setOtherUser] = useState<tGetUser>({
    login: "",
    password: "",
    id: null,
    user_name: "",
    image: "",
  });

  const { socket } = useWebSocket();

  const sendMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          text: text,
          receiver_id: receiver_id,
          chat_id: chat_id,
        }),
      );
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetMessages(Number(chat_id));

      if (response.success) {
        setMessages(response.data);
      }
    };
    FetchData();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      console.log("📩 Получено через WebSocket:", event.data);

      setMessages((prev) => {
        if (prev.some((item) => item.id === message.id)) {
          return prev;
        }

        return [...prev, message];
      });
    };

    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetUser();

      if (response.success) {
        setCurrentUser(response.data);
      }
    };

    FetchData();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      const response = await GetUserById(Number(receiver_id));

      if (response.success) {
        setOtherUser(response.data);
      }
    };

    FetchData();
  }, []);

  const senderId = messages.find(
    (message) => message.sender_id !== currentUser.id,
  )?.sender_id;

  return (
    <>
      <MyNavbar />
      <div className="title">
        <img src={`/${otherUser.image}`} onClick={()=>navigate(`/user/${otherUser.id}`)}/>
        <span>{otherUser.user_name}</span>
      </div>
      <div className="chat-page">
        <main className="messages">
          {messages.map((message) => (
            <div
              className={
                message.sender_id === currentUser.id
                  ? "message my-message"
                  : "message"
              }
            >
              {message.text} <br />
              <span className="time">{message.formatted_time}</span>
            </div>
          ))}
        </main>

        <form className="message-form">
          <input
            type="text"
            placeholder="Написать сообщение..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit" onClick={(e) => sendMessage(e)}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatPage;
