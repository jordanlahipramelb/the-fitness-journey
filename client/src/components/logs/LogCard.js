import React from "react";
import { Link } from "react-router-dom";
import "./LogCard.css";

/** Card component showing snapshot information about an log.
 *
 * Child of LogList
 *
 * LogList -> LogCard
 */

const LogCard = ({ id, date, username }) => {
  return (
    <div className="LogCard">
      <Link to={`/logs/${id}`} style={{ textDecoration: "none" }} key={id}>
        <section className="log">
          <h2 className="log-name">{date}</h2>
          <div class="log-meta">
            <ul>
              <li class="d-flex align-items-center">
                <i class="far fa-user"></i>
                <Link
                  to={`/athletes/${username}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                  key={id}
                >
                  {" "}
                  Logged by {username}
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default LogCard;
