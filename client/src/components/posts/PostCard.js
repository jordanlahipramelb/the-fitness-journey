import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";

/** Card component showing snapshot information about a post.
 *
 * Child component of PostList
 *
 * PostList -> PostCard
 */

const PostCard = ({ id, username, subject, date }) => {
  return (
    <section id="PostCard">
      <article className="entry">
        <Link
          className="PostCard"
          to={`/forum/${id}`}
          style={{ textDecoration: "none" }}
          key={id}
        >
          <h2 className="entry-title">{subject}</h2>
        </Link>
        <div className="entry-meta">
          <ul>
            <li className="d-flex align-items-center">
              <i className="far fa-user"></i>
              <Link
                to={`/athletes/${username}`}
                style={{ color: "inherit", textDecoration: "none" }}
                key={id}
              >
                {username}
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <i className="far fa-clock"></i>
              {date}
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
};

export default PostCard;
