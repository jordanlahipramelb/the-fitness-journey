import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

import "./PostView.css";

/** Render a Single Post
 *  /forum/:id
 *
 * - show edit/delete buttons (& call parent on action)
 *
 */

const PostView = ({ post, toggleEdit, deletePost }) => {
  const { username, subject, body, date } = post;

  /** Provided from UserContext in App in order to obtain currentUser, which verifies if a user is logged in. */

  const { currentUser } = useContext(UserContext);

  /** sameUser is true if currentUser username matches username of comment */

  let sameUser;
  if (currentUser.username === username) {
    sameUser = true;
  } else {
    sameUser = false;
  }

  /** User edit buttons if post is same user */

  const userEditBtns = () => {
    return (
      <div className="PostView-right">
        <i className="fas fa-edit text-primary icon" onClick={toggleEdit} />
        <i className="fas fa-times text-danger icon" onClick={deletePost} />
      </div>
    );
  };

  return (
    <div className="PostView">
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb" className="pb-2">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/forum" style={{ textDecoration: "none" }}>
                      Forum
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Post
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <section className="post">
          {sameUser ? userEditBtns() : null}

          <h2 className="post-title">{subject}</h2>

          <div className="post-meta">
            <ul>
              <li className="d-flex align-items-center">
                <i className="far fa-user"></i>
                <a
                  href={`/athletes/${username}`}
                  style={{ textDecoration: "none" }}
                >
                  {username}
                </a>
              </li>

              <li className="d-flex align-items-center">
                <i className="far fa-clock"></i>
                {date}
              </li>
            </ul>
          </div>
          <div className="post-content mt-4">
            <p>{body}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostView;
