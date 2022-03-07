import React from "react";
import { Link } from "react-router-dom";

import "./ExerciseDetails.css";

/** Renders single exercise
 *
 * Child of RoutineExerciseList Component
 */

const RoutineExercise = ({ id, name, sets, reps }) => {
  return (
    <li className="RoutineExercise list-group-item" key={name}>
      <Link
        href={`/exercises/${id}`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        {name}
      </Link>
      : {sets} sets of {reps} reps
    </li>
  );
};

export default RoutineExercise;
