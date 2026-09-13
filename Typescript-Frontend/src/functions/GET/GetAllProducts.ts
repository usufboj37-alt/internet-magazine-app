import type { Item} from "../../types";


const GetProducts = async (page:number,limit:number) => {
  const response = await fetch(`/api/products?page=${page}&limit=${limit}`, {
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

export default GetProducts;