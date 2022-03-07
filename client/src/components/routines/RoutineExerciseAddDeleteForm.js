import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

import FitnessJourney from "../../api";
import LoadingPage from "../common/LoadingPage";
import "./RoutineExerciseAddDeleteForm.css";

/** Routine Exercise Add Delete Form Component
 *
 * Consists of 2 forms that add an exercise to a routine
 *    Add: exercise name, number of sets, and number of reps.
 *    Delete: routines_exercises_id
 *
 * Child of RoutineView
 */

const RoutineExerciseAddDeleteForm = ({
  addExercise,
  deleteExercise,
  routineExercises,
}) => {
  const { routineId } = useParams();

  const [formData, setFormData] = useState({
    routine_id: routineId,
    exercise_id: "",
    dayOfWeek: "",
    sets: "",
    reps: "",
    routines_exercises_id: "",
  });

  const [allExercises, setAllExercises] = useState(null);

  useEffect(function getAllExercisesOnMount() {
    async function getExercises() {
      setAllExercises(await FitnessJourney.getExercises());
    }

    getExercises();
  }, []);

  if (!allExercises) return <LoadingPage />;

  /** Handles input change */

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleAddSubmit = (evt) => {
    evt.preventDefault();

    addExercise(formData);
  };

  const handleDeleteSubmit = (evt) => {
    evt.preventDefault();

    deleteExercise(formData.routines_exercises_id);
  };

  return (
    <div className="RoutineExerciseAddDeleteForm pb-5">
      <div className="row">
        <div className="col-sm-6 col-md-6">
          <div className="add-delete-form">
            <form onSubmit={handleAddSubmit}>
              <div className="card-body p-2">
                <h4 className="card-title text-center">Add Exercise</h4>
                <div className="row">
                  <div className="col">
                    <FormControl fullWidth>
                      <InputLabel id="dayOfWeek">Day</InputLabel>
                      <Select
                        label="Day"
                        name="dayOfWeek"
                        labelId="dayOfWeek"
                        value={formData.dayOfWeek}
                        onChange={handleInputChange}
                        required
                      >
                        <MenuItem value="" disabled hidden>
                          Select Day
                        </MenuItem>
                        <MenuItem value="1">Day 1</MenuItem>
                        <MenuItem value="2">Day 2</MenuItem>
                        <MenuItem value="3">Day 3</MenuItem>
                        <MenuItem value="4">Day 4</MenuItem>
                        <MenuItem value="5">Day 5</MenuItem>
                        <MenuItem value="6">Day 6</MenuItem>
                        <MenuItem value="7">Day 7</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col">
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="Sets"
                        name="sets"
                        value={formData.sets}
                        onChange={handleInputChange}
                        required
                      />
                    </FormControl>
                  </div>
                  <div className="col">
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="Reps"
                        name="reps"
                        value={formData.reps}
                        onChange={handleInputChange}
                        required
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="row">
                  <div className="my-2">
                    <FormControl fullWidth>
                      <InputLabel id="exercise">Exercise</InputLabel>
                      <Select
                        className=""
                        label="Exercise"
                        labelId="exercise"
                        name="exercise_id"
                        value={formData.exercise_id}
                        onChange={handleInputChange}
                        required
                      >
                        {allExercises.map((exercise) => (
                          <MenuItem value={exercise.id} key={exercise.id}>
                            {exercise.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary container mt-2"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="add-delete-form">
            <form onSubmit={handleDeleteSubmit}>
              <div className="card-body p-2">
                <h4 className="card-title text-center">Delete Exercise</h4>
                <div className="my-2">
                  <FormControl fullWidth>
                    <InputLabel id="routines_exercises_id">Exercise</InputLabel>
                    <Select
                      className=""
                      labelId="routines_exercises_id"
                      label="routines_exercises_id"
                      name="routines_exercises_id"
                      value={formData.routines_exercises_id}
                      onChange={handleInputChange}
                      required
                    >
                      {routineExercises.length ? (
                        routineExercises.map((e) => (
                          <MenuItem value={e.id} key={e.id}>
                            Day {e.dayofweek}: {e.name} {e.sets} sets of{" "}
                            {e.reps} reps
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>No exercises found in routine</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
                <button type="submit" className="btn btn-danger container mt-2">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineExerciseAddDeleteForm;
