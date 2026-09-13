import type { tGetChat } from "../../types";

const GetChat = async (seller_id: number) => {
  const response = await fetch(`/api/get-chat?seller_id=${seller_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data: tGetChat = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default GetChat;
