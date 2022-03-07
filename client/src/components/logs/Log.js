import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import FitnessJourney from "../../api";
import LoadingPage from "../common/LoadingPage";
import LogView from "./LogView";
import LogEditForm from "./LogEditForm";

/** Main Log Component
 *
 * Received log data from state.
 *
 * Decides, from its own state, whether to show the edit form or the simple LogView component.
 * This also handles editing and deleting a log.
 *
 * log: log data retrieved through API (username, date)
 * logEntries: log entries retrieved through API (id, log_id, name, set_number, reps)
 *      Passed to LogView
 * routinesWithExercises: routines/exercises in database (routineId, routineName, routineExerciseId, dayofweek, exerciseName, reps, sets)
 *      Passed to LogView
 *
 *
 * Parent for
 * - LogEditForm
 * - LogView
 */

const Log = () => {
  const history = useHistory();

  const { logId } = useParams();
  const [log, setLog] = useState(null);
  const [logEntries, setLogEntries] = useState(null);
  const [routinesWithExercises, setRoutinesWithExercises] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  /** Request log from API via logId */

  useEffect(
    function getLogOnMount() {
      async function getLog() {
        let log = await FitnessJourney.getLog(logId);

        setLog(log);
      }

      getLog();
    },
    // rerun when log id changes
    [logId]
  );

  useEffect(
    function getLogEntriesOnMount() {
      async function getLogEntries() {
        setLogEntries(await FitnessJourney.getLogEntries(logId));
      }

      getLogEntries();
    },
    [logId]
  );

  useEffect(
    function getRoutinesWithExercisesOnMount() {
      async function getRoutinesWithExercises() {
        setRoutinesWithExercises(
          await FitnessJourney.getRoutinesWithExercises(logId)
        );
      }

      getRoutinesWithExercises();
    },
    [logId]
  );

  if (!log || !logEntries || !routinesWithExercises) return <LoadingPage />;

  /** Toggles editing routine on/off */

  const toggleEdit = () => {
    setIsEditing((editing) => !editing);
  };

  /** Handles editing a log */

  const editLogDate = async (logId) => {
    await FitnessJourney.updateLog(logId, log);

    window.location.reload(true);
  };

  /** Handles deleting a log */

  const deleteLog = async () => {
    await FitnessJourney.deleteLog(logId);

    history.push(`/logs`);
  };

  /** Adds log entry to log */

  const addLogEntryToLog = async (logEntry) => {
    await FitnessJourney.addLogEntry(logEntry);

    window.location.reload(true);
  };

  /** Deletes log entry from log */

  const deleteLogEntryFromLog = async (id) => {
    await FitnessJourney.deleteLogEntry(id);

    window.location.reload(true);
  };

  const cancel = () => history.push(`/logs/${logId}`);

  console.log(routinesWithExercises);

  return (
    <div className="Log py-4">
      <div className="container">
        {/* Decide whether to show the edit form if toggleEdit is true, or the simple RoutineView component */}

        {isEditing ? (
          <LogEditForm log={log} updateLog={editLogDate} cancel={cancel} />
        ) : (
          <LogView
            log={log[0]}
            deleteLog={deleteLog}
            toggleEdit={toggleEdit}
            logEntries={logEntries}
            addEntry={addLogEntryToLog}
            deleteEntry={deleteLogEntryFromLog}
            routinesWithExercises={routinesWithExercises}
          />
        )}
      </div>
    </div>
  );
};

export default Log;
