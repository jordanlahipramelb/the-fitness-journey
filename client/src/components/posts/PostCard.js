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
          <h2 class="entry-title">{subject}</h2>
        </Link>
        <div class="entry-meta">
          <ul>
            <li class="d-flex align-items-center">
              <i class="far fa-user"></i>
              <Link
                to={`/athletes/${username}`}
                style={{ color: "inherit", textDecoration: "none" }}
                key={id}
              >
                {username}
              </Link>
            </li>
            <li class="d-flex align-items-center">
              <i class="far fa-clock"></i>
              {date}
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
};

export default PostCard;
