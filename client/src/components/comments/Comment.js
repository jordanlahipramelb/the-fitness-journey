import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Comment.css";

/** Renders single comment
 *
 * Can be deleted via id with function passed down
 * from main parent Post -> CommentList -> Comment.
 * Displays text.
 */

const Comment = ({ id, username, body, date, deleteComment }) => {
  /** Provided from UserContext in App in order to obtain currentUser, which verifies if a user is logged in. */
  const { currentUser } = useContext(UserContext);

  /** sameUser is true if currentUser username matches username of comment */
  let sameUser;
  if (currentUser.username === username) {
    sameUser = true;
  } else {
    sameUser = false;
  }

  /** Handles deleting a comment via function passed in from Post->CommentList */

  const handleDelete = () => {
    deleteComment(id);
  };

  /** User edit buttons if comment is same user */

  const userEditBtns = () => {
    return (
      <div className="Comment-editArea">
        {deleteComment && (
          <i
            className="deleteBtn fa fa-times text-danger mr-2"
            onClick={handleDelete}
            title="Delete Comment?"
          />
        )}
      </div>
    );
  };

  return (
    <div className="comment" key={id}>
      <div class="d-flex">
        {sameUser ? userEditBtns() : null}
        <div>
          <Link
            to={`/athletes/${username}`}
            style={{ color: "inherit", textDecoration: "none" }}
            key={id}
          >
            <p>{username}</p>
          </Link>
          <div className="d-flex align-items-center">
            <i className="far fa-clock"></i>
            <time>{date}</time>
          </div>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
