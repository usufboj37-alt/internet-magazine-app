import type { User } from "../../types";

const AddRating = async (id:number,rating:number) => {
  const response = await fetch(`/api/add-rating?product_id=${id}&rating=${rating}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    
  },
);

  const data=await response.json()
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default AddRating;