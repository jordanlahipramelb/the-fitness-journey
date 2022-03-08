import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Profile.css";

import LoadingPage from "../common/LoadingPage";
import FitnessJourney from "../../api";

/** Profile Component
 *
 * Fetches user data from database.
 *
 */

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  /** Request post from API via postId */

  useEffect(
    function getUserOnMount() {
      async function getUser() {
        let user = await FitnessJourney.getCurrentUser(username);
        // set user state to the handle
        setUser(user);
      }

      getUser();
    },
    // rerun when user changes
    [username]
  );

  if (!user) return <LoadingPage />;

  return (
    <div className="UserProfile py-4">
      <div className="container pb-5 mb-5">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb" className="pb-2 mb-4">
            <nav aria-label="breadcrumb">
              <div className="d-flex justify-content-between align-items-center">
                <h2>{user.username}</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item past">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Athlete
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <div className="col-md-8 offset-md-2">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
              <div className="panel">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <img
                      alt="User Avatar"
                      src={user.imageUrl}
                      className="img-thumbnail rounded mx-auto d-block"
                    />
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <h4>@{user.username}</h4>

                    <div className="dashboard-content">
                      <p>{user.bio}</p>
                      <p>
                        <span className="fa fa-map-marker"></span> {user.city},
                        {user.state}
                      </p>
                      <p>{user.fitnessType}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
              <div className="panel">
                <div className="dashboard-panel">
                  <h4 className="dashboard-title">Routines</h4>
                  <div className="dashboard-content">
                    {user.routines.length ? (
                      <ul className="list-group list-group-flush">
                        {user.routines.map((routine) => (
                          <Link
                            to={`/routines/${routine.id}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            <li className="list-group-item list-group-item-action">
                              {routine.name}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    ) : (
                      <p className="lead text-center">No routines found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
              <div className="panel">
                <div className="dashboard-panel">
                  <h4 className="dashboard-title">Workouts Logged</h4>
                  <div className="dashboard-content">
                    <ul className="list-group list-group-flush">
                      {user.logs.length ? (
                        user.logs.map((log) => (
                          <Link
                            to={`/logs/${log.id}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            <li
                              className="list-group-item list-group-item-action"
                              key={log.id}
                            >
                              {log.date}
                            </li>
                          </Link>
                        ))
                      ) : (
                        <p>No logs found</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
