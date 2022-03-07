import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";
import LogForm from "./LogForm";

/** A simple component that renders the LogForm
 *
 * Consists of functions passed to LogForm
 */

const NewLog = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;

  /** Set up date format */

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  const [log, setLog] = useState({
    date: `${today}`,
    username: username,
  });

  /** Add Log */

  const addLog = async (log) => {
    let res = await FitnessJourney.addLog(log);
    setLog(res);

    history.push(`/athlete`);
  };

  /** Cancel routine creation and redirect to routines */

  const cancel = () => history.push(`/logs`);

  return (
    <div className="NewLogForm py-4">
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
                    <Link
                      to={`/logs/${currentUser.username}`}
                      style={{ textDecoration: "none" }}
                    >
                      Logs
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    New
                  </li>
                </ol>
              </div>
            </nav>
          </section>

          <LogForm log={log} cancel={cancel} addLog={addLog} />
        </div>
      </div>
    </div>
  );
};

export default NewLog;
