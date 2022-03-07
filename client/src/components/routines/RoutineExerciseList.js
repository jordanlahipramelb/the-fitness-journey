import React from "react";
import ExerciseDetails from "./ExerciseDetails";

/** Renders list of exercises in routine
 *
 * Exercises are passed down from props.
 */

const RoutineExerciseList = ({ exercises = [] }) => {
  return (
    <div className="RoutineExerciseList">
      <ul className="list-group list-group-flush">
        {exercises.map((exercise) => (
          <ExerciseDetails
            id={exercise.exerciseId}
            key={exercise.exerciseName}
            name={exercise.exerciseName}
            sets={exercise.sets}
            reps={exercise.reps}
          />
        ))}
      </ul>
    </div>
  );
};

export default RoutineExerciseList;
