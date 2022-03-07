import React from "react";
import { Link } from "react-router-dom";
import "./ExerciseCard.css";

/** Card component showing snapshot information about an exercise.
 *
 * Child of ExerciseList
 *
 * ExerciseList -> ExerciseCard
 */

const ExerciseCard = ({ id, name }) => {
  return (
    <div className="ExerciseCard">
      <Link to={`/exercises/${id}`} style={{ textDecoration: "none" }} key={id}>
        <section className="exercise">
          <h2 className="exercise-name">{name}</h2>
        </section>
      </Link>
    </div>
  );
};

export default ExerciseCard;
