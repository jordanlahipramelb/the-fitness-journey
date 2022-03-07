import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import RoutineExerciseList from "./RoutineExerciseList";
import "./RoutineView.css";
import LoadingPage from "../common/LoadingPage";
import RoutineExerciseAddDeleteForm from "./RoutineExerciseAddDeleteForm";

/** Render a single routine
 *  /routines/:id
 *
 * Child of Routine
 *
 * - show edit/delete buttons (& call parent on action)
 */

const RoutineView = ({
  toggleEdit,
  routine,
  routineExercises,
  addExercise,
  deleteExercise,
  deleteRoutine,
}) => {
  /** Provided from UserContext in App in order to obtain currentUser, which verifies if a user is logged in. */

  const { currentUser } = useContext(UserContext);

  /** sameUser is true if currentUser username matches username of comment */

  let sameUser;
  if (currentUser.username === routine[0].username) {
    sameUser = true;
  } else {
    sameUser = false;
  }

  /** User edit buttons if routine is same user */

  const userEditBtns = () => {
    return (
      <>
        <i
          className="fas fa-edit text-primary icon"
          title="Edit Routine"
          onClick={toggleEdit}
        />
        <i
          className="fas fa-times text-danger icon"
          title="Delete Routine"
          onClick={deleteRoutine}
        />
      </>
    );
  };

  /** User entry form
   * Renders if current user is the same user as the routine user
   */

  const userForm = () => {
    return (
      <>
        <RoutineExerciseAddDeleteForm
          routineExercises={routineExercises}
          addExercise={addExercise}
          deleteExercise={deleteExercise}
        />
      </>
    );
  };

  /** Render loading if routine not yet mounted */

  if (!routine[0]) return <LoadingPage />;

  return (
    <div className="RoutineView container mb-5">
      <div className="col-md-10 offset-md-1">
        <section id="breadcrumb" className="pb-2">
          <nav aria-label="breadcrumb">
            <div className="d-flex justify-content-between align-items-center">
              <h2>{routine[0].name}</h2>
              <ol className="breadcrumb">
                <li className="breadcrumb-item past">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/routines" style={{ textDecoration: "none" }}>
                    Routines
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Routine
                </li>
              </ol>
            </div>
          </nav>
        </section>
      </div>

      <div className="col-md-8 offset-md-2 mt-4">
        <div className="text-center mb-4">
          <div className="edit-area">
            <span>
              Created by{" "}
              <Link
                to={`/athletes/${routine[0].username}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {routine[0].username}
              </Link>
            </span>
            {sameUser ? userEditBtns() : null}
          </div>
        </div>
        <p>{routine[0].description}</p>

        <div className="row">
          {routine.map((data) => (
            <div className="col-lg-6" key={data.dayofweek}>
              <div className="card my-3 p-2">
                {data.exercises.length === 0 ? (
                  <div className="card-body">
                    <p className="text-center">
                      Athlete has not added exercises yet.
                    </p>
                  </div>
                ) : (
                  <div className="card-body" key={data.dayofweek}>
                    <h4 className="card-title">Day {data.dayofweek}</h4>
                    <RoutineExerciseList exercises={data.exercises} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {sameUser ? (
        <div className="text-center pt-5">
          <hr class />
          {userForm()}
        </div>
      ) : null}
    </div>
  );
};

export default RoutineView;
