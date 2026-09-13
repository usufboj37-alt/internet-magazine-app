import { useContext } from "react";
import type { Operation, tGetUser } from "../../types";


const GetUserById = async (user_id:number) => {
  const response = await fetch("/api/get-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      user_id:user_id
    })
  });

  const data: tGetUser = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default GetUserById;
