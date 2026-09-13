import type { tGetChat } from "../../types";

const GetChats = async () => {
  const response = await fetch("/api/chats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data: tGetChat[] = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default GetChats;
