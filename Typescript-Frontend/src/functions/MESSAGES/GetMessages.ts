import type { Message } from "../../types";

const GetMessages = async (id:number) => {
  const response = await fetch(`/api/messages?chat_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    
  });

  const data:Message[]=await response.json()
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default GetMessages;