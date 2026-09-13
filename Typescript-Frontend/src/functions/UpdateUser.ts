
const UpdateUser = async (new_user_name:string | null=null,new_login:string | null=null,new_password:string | null=null) => {
  const response = await fetch("/api/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
        new_user_name:new_user_name,
        new_login:new_login,
        new_password:new_password
    }),
  });

  const data=await response.json()
  
  return {
    success:response.ok,
    status:response.status,
    data:data
  }
};

export default UpdateUser;