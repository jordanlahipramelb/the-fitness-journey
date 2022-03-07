import React, { useState, useEffect } from "react";
import FitnessJourney from "../../api";
import SearchForm from "../common/SearchForm";
import LoadingPage from "../common/LoadingPage";
import ExerciseCard from "./ExerciseCard";
import { Link } from "react-router-dom";

/** Exercise List Component
 * /exercises
 *
 * Renders list of exercises via cards in database
 *
 * exercises: exercises in database
 *
 * ExerciseList -> SearchForm
 *              -> ExerciseCard
 *
 */

const ExerciseList = () => {
  console.debug("ExerciseList");
  const [exercises, setExercises] = useState(null);

  /** Allows use of async search function */

  useEffect(function getExercisesOnMount() {
    search();
  }, []);

  const search = async (name) => {
    let exercises = await FitnessJourney.getExercises(name);

    setExercises(exercises);
  };

  /** If no exercises, return Loading component */

  if (!exercises) return <LoadingPage />;

  /** If no exercises and there are 0 exercises in state */

  if (!exercises && exercises.length === 0) {
    return <h3 className="text-center">No exercises present.</h3>;
  }

  return (
    <div className="ExerciseList py-4">
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb" className="pb-2">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-between align-items-center">
                <h2>Exercises</h2>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item past">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Exercises
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <div className="col-md-8 offset-md-2">
          <SearchForm searchFor={search} />

          {exercises.length ? (
            <div className="ExerciseList-list">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  id={exercise.id}
                  name={exercise.name}
                />
              ))}
            </div>
          ) : (
            <h3 className="lead">No exercises found.</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseList;
