import type { User } from "../../types";
const Login = async ({ id, password, login }: User) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default Login;
