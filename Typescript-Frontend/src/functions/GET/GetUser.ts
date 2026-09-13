import { useContext } from "react";
import type { tGetUser } from "../../types";

const GetUser = async () => {
  const response = await fetch("/api/get_user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data: tGetUser = await response.json();

  console.log(data);

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default GetUser;
