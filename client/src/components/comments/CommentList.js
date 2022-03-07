import React from "react";
import Comment from "./Comment";

/** Renders list of comments
 *
 * Comments are passed down from props.
 * Renders Comment components.
 *
 * deleteComment function passed down from Post component
 */

const CommentList = ({ comments = [], deleteComment }) => {
  return (
    <div className="CommentList px-4">
      <div className="container">
        {comments.map((comment) => (
          <>
            <Comment
              key={comment.id}
              id={comment.id}
              username={comment.username}
              body={comment.body}
              date={comment.date}
              deleteComment={deleteComment}
            />
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
