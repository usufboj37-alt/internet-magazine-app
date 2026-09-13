import React, { useEffect, useState } from "react";
import type { Comment, Item, User } from "../../types";
import { ProductItem } from "../products/ProductItem";
import CommentItem from "./CommentItem";
import GetUser from "../../functions/GET/GetUser";

type Props = {
  comments: Comment[];
};

const CommentsList = ({ comments }: Props) => {
  return comments.map((comment) => (
    <CommentItem
      user_name={comment.user_name}
      image={comment.image}
      text={comment.text}
    />
  ));
};

export default CommentsList;
