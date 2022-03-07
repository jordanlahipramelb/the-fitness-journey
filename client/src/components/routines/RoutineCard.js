import React from "react";
import { Link } from "react-router-dom";
import "./RoutineCard.css";

/** Card component showing snapshot information about a routine.
 *
 * Child component of RoutineList
 *
 * RoutineList -> RoutineCard
 */

const RoutineCard = ({ id, name, username }) => {
  return (
    <div className="RoutineCard">
      <Link to={`/routines/${id}`} key={id} style={{ textDecoration: "none" }}>
        <section className="routine">
          <h2 className="routine-name">{name}</h2>
          <div class="routine-meta">
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
            </ul>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default RoutineCard;
