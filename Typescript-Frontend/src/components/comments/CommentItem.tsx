import React from "react";
import type { CommentProps } from "../../types";
import "../css/Comment.css";
const CommentItem = ({ user_name, text, image }: CommentProps) => {
  return (
    <div className="comment">
      <img src={`/${image}`} className="comment-avatar" />

      <div className="comment-content">
        <span className="comment-username">{user_name}</span>

        <p className="comment-text">{text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
