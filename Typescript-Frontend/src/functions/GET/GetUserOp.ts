import { useContext } from "react";
import type { Operation, tGetUser } from "../../types";


const GetUserOp = async () => {
  const response = await fetch("/api/user-operations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data: Operation[] = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default GetUserOp;
