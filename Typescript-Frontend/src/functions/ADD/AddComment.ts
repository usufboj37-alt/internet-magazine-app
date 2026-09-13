import type { User } from "../../types";

const AddComment = async (id: number, text: string) => {
  const response = await fetch(`/api/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify({
      product_id: id,
      text: text,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    status: response.status,
    data: data,
  };
};

export default AddComment;
