import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FitnessJourney from "../../api";
import LoadingPage from "../common/LoadingPage";
import "./ExerciseDetails.css";

/** Component that renders details of a single exercise.
 * /exercises/:id
 *
 * Consists of an exercise's:
 * - Name
 * - Description
 * - Image
 * - Instructions
 */

const ExerciseDetails = () => {
  /** Retrieve id of exercise from handle */
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(
    function getExerciseOnMount() {
      async function getExercise() {
        setExercise(await FitnessJourney.getExercise(id));
      }

      getExercise();
    },
    [id]
  );

  if (!exercise) return <LoadingPage />;

  return (
    <div className="ExerciseDetails py-4">
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb" className="pb-3">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-between align-items-center">
                <h2>{exercise.name}</h2>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link to="/exercises" style={{ textDecoration: "none" }}>
                      Exercises
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Exercise
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <div className="col-md-8 offset-md-2">
          <div className="card m-2 p-2">
            <div className="card-body">
              <p className="card-text">{exercise.description}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div className="card m-2">
                <div className="card-body">
                  <h5 className="card-title">Equipment Type</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {exercise.equipmentType}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-6">
              <div className="card m-2">
                <div className="card-body">
                  <h5 className="card-title">Muscles Worked</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Primary: {exercise.primaryMuscle}
                    </li>
                    {exercise.secondaryMuscle === null ? null : (
                      <li className="list-group-item">
                        Secondary: {exercise.secondaryMuscle}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center m-4">
            <img
              src={exercise.image_url}
              alt={`${exercise.name}`}
              className="img-fluid rounded"
            />
          </div>
          <div className="card m-2 p-2">
            <div className="card-body">
              <h5 className="card-title">Instructions</h5>
              <p className="card-text">{exercise.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;
