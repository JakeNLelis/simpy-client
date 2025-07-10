import React from "react";

function PostComment({ comment }) {
  return (
    <div>
      <h1>{comment.creator.fullName}</h1>
      <p>{comment.comment}</p>
    </div>
  );
}

export default PostComment;
