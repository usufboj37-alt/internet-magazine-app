import type { User } from "../../types";

const GetRating = async (id: number) => {
  const response = await fetch(`/api/rating?id=${id}`, {
    method: "POST",
    credentials: "include",
    
  });
  const data = await response.json();
  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default GetRating;
