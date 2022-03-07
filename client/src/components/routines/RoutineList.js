import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FitnessJourney from "../../api";
import SearchForm from "../common/SearchForm";
import LoadingPage from "../common/LoadingPage";
import RoutineCard from "./RoutineCard";

/** Routine List Component
 * /routines
 *
 * Renders list of routines via cards in database
 *
 * routines: routines in database
 *
 * RoutineList -> SearchForm
 *             -> RoutineCard
 *
 */

const RoutineList = () => {
  const [routines, setRoutines] = useState(null);

  /** Allows use of async search function */

  useEffect(function getRoutinesOnMount() {
    search();
  }, []);

  const search = async (name) => {
    let routines = await FitnessJourney.getRoutines(name);

    setRoutines(routines);
  };

  /** If no routines, return Loading component */

  if (!routines) return <LoadingPage />;

  /** If no routines and there are 0 routines in state */

  if (!routines && routines.length === 0) {
    return <h3 className="text-center">No routines present.</h3>;
  }

  return (
    <div className="RoutineList py-4">
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb" className="pb-2">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-between align-items-center">
                <h2>Routines</h2>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item past">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Routines
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <div className="col-md-8 offset-md-2">
          <SearchForm searchFor={search} />
          <Link to="/routines/new">
            <button className="btn btn-primary container mb-3">
              New Routine
            </button>
          </Link>

          <section className="routines mt-3">
            {routines.length ? (
              <div className="RoutineList-list">
                {routines.map((routine) => (
                  <RoutineCard
                    key={routine.id}
                    id={routine.id}
                    name={routine.name}
                    username={routine.username}
                  />
                ))}
              </div>
            ) : (
              <h3 className="lead">No routines found.</h3>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default RoutineList;
