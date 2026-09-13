import type { User } from "../../types";

const Refresh = async () => {
  const response = await fetch("/api/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default Refresh;
