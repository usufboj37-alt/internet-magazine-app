import type { Item} from"../../types";


const GetProduct = async (id:number) => {
  const response = await fetch(`/api/get-product?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data=await response.json()

  console.log(data)
 
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default GetProduct;