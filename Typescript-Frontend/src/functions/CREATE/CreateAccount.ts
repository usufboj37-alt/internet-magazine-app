import type { User } from "../../types";

const CreateUser = async ({login,password,user_name,image}:User) => {
    const formData = new FormData();

    formData.append("login", login);
    formData.append("password", password.toString());
    formData.append("user_name", user_name);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("/api/create-user", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
  const data=await response.json()
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
  };

export default CreateUser