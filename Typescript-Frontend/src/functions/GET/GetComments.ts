import type { User } from "../../types";

const GetComments = async (id:number) => {
  const response = await fetch(`/api/comments?product_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    
  });

  const data=await response.json()
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default GetComments;