import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";
import RoutineForm from "./RoutineForm";

/** A simple component that renders the RoutineForm
 *
 * Consists of functions passed to RoutineForm
 */

const NewRoutine = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  const [routine, setRoutine] = useState({
    username: username,
    name: "",
    description: "",
  });

  /** Add Routine */

  const addRoutine = async (routine) => {
    let res = await FitnessJourney.addRoutine(routine);

    setRoutine(res);
    history.push(`/routines`);
  };

  /** Cancel routine creation and redirect to routines */

  const cancel = () => history.push("/routines");

  return (
    <div className="NewRoutineForm  py-4">
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-end">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link to="/routines" style={{ textDecoration: "none" }}>
                      Routines
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Routine
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <div className="text-center">
          <p className="text-muted mb-0 mt-2 px-2">
            Create your routine below.
          </p>
          <p className="text-muted mb-3 px-2">
            Once created, open your created routine and add your exercises.
          </p>
        </div>
        <RoutineForm
          routine={routine}
          addRoutine={addRoutine}
          cancelRoutine={cancel}
        />
      </div>
    </div>
  );
};

export default NewRoutine;
