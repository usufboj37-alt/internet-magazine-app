import type { User } from "../../types";

const Logout = async () => {
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data: User = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default Logout;
