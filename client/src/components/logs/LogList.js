import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FitnessJourney from "../../api";
import LoadingPage from "../common/LoadingPage";
import SearchForm from "../common/SearchForm";
import LogCard from "./LogCard";

/** Log List Component
 * /logs
 *
 * Renders list of logs via cards in database
 *
 * logs: logs in database
 *
 * LogList -> SearchForm
 *         -> LogCard
 *
 */

const LogList = () => {
  const [logs, setLogs] = useState(null);

  /** Allows use of async search function */

  useEffect(function getLogsOnMount() {
    search();
  }, []);

  const search = async (date) => {
    let logs = await FitnessJourney.getLogs(date);

    setLogs(logs);
  };

  /** If no logs, return Loading component */

  if (!logs) return <LoadingPage />;

  /** If no logs and there are 0 logs in state */

  if (!logs && logs.length === 0) {
    return <h3 className="text-center">No logs present.</h3>;
  }

  return (
    <div className="LogList py-4">
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb" className="pb-2">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-between align-items-center">
                <h2>Logs</h2>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item past">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Logs
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <div className="col-md-8 offset-md-2">
          <SearchForm searchFor={search} />
          <Link to="/logs/new">
            <button className="btn btn-primary container mb-3">New Log</button>
          </Link>

          <section className="logs mt-3">
            {logs.length ? (
              <div className="LogsList-list">
                {logs.map((log) => (
                  <LogCard
                    key={log.id}
                    id={log.id}
                    date={log.date}
                    username={log.username}
                  />
                ))}
              </div>
            ) : (
              <h3 className="lead text-center">No logs found.</h3>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default LogList;
