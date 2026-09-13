import type { Item} from"../../types";


const GetOperations = async (id:number) => {
  const response = await fetch(`/api/operations?wallet_id=${id}`, {
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

export default GetOperations;