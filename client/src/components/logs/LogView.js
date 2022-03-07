import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import LogEntryForm from "./LogEntryForm";

import "./LogView.css";
import LoadingPage from "../common/LoadingPage";

/** Render a single log
 * /logs/:id
 *
 * Parent of LogEntryForm
 * Child of Log -> LogView
 *
 * - show edit/delete buttons (& call parent on action)
 */

const LogView = ({
  log,
  toggleEdit,
  deleteLog,
  logEntries,
  routinesWithExercises,
  addEntry,
  deleteEntry,
}) => {
  /** Provided from UserContext in App in order to obtain currentUser, which verifies if a user is logged in. */

  const { currentUser } = useContext(UserContext);

  /** sameUser is true if currentUser username matches username of comment */

  let sameUser;
  if (currentUser.username === log.username) {
    sameUser = true;
  } else {
    sameUser = false;
  }

  /** User edit buttons if log is same user */

  const userEditBtns = () => {
    return (
      <>
        <i
          className="fas fa-edit text-primary icon"
          title="Update Date"
          onClick={toggleEdit}
        />
        <i
          className="fas fa-times text-danger icon"
          title="Delete Log"
          onClick={deleteLog}
        />
      </>
    );
  };

  /** User entry form
   * Renders if current user is the same user as the log user
   */

  const userForm = () => {
    return (
      <>
        <LogEntryForm
          logEntries={logEntries}
          routinesWithExercises={routinesWithExercises}
          addEntry={addEntry}
        />
      </>
    );
  };

  /** Render loading if log not yet mounted */

  if (!log) return <LoadingPage />;

  return (
    <div className="LogView container mb-5">
      <div className="col-md-10 offset-md-1">
        <section id="breadcrumb" className="pb-2">
          <nav aria-label="breadcrumb">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Workout</h2>
              <ol className="breadcrumb">
                <li className="breadcrumb-item past">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/logs" style={{ textDecoration: "none" }}>
                    Logs
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Log
                </li>
              </ol>
            </div>
          </nav>
        </section>
      </div>

      <div className="col-md-8 offset-md-2">
        <div className="text-center mb-4">
          <div className="edit-area">
            <span className="log-date">{log.date}</span>
            {sameUser ? userEditBtns() : null}
          </div>
          <small>
            Logged by{" "}
            <Link
              to={`/athletes/${log.username}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {log.username}
            </Link>
          </small>
        </div>

        {log.entries.length ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Exercise</th>
                <th scope="col">Set Number</th>
                <th scope="col">Reps</th>
                <th scope="col">Weight</th>
                {sameUser ? <th scope="col">Delete?</th> : null}
              </tr>
            </thead>
            <tbody>
              {log.entries.map((entry) => (
                <tr key={entry.entryId}>
                  <th scope="row">{entry.exerciseName}</th>
                  <td>{entry.setNumber}</td>
                  <td>{entry.reps}</td>
                  <td>{entry.weight}</td>

                  {sameUser ? (
                    <td>
                      <i
                        className="fas fa-times text-danger icon"
                        title="Delete Entry?"
                        onClick={() => deleteEntry(entry.entryId)}
                      />
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="col-md-6 offset-md-3">
            <div className="no-entries">
              <p className="text-center">Athlete has not added any entries.</p>
            </div>
          </div>
        )}
      </div>

      <div className="text-center pt-5">
        <hr />
        {sameUser ? userForm() : null}
      </div>
    </div>
  );
};

export default LogView;
