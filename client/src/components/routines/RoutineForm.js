import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import "./RoutineForm.css";

/** Routine Form Component
 *
 * Allows input of name and description of routine
 *
 * Child of NewRoutine Component
 */

const RoutineForm = ({ routine, addRoutine, cancel }) => {
  const [formData, setFormData] = useState({
    username: routine.username,
    name: routine.name,
    description: routine.description,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((d) => ({
      ...d,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    addRoutine(formData);
  };

  return (
    <div className="RoutineForm mb-4">
      <div className="col-sm-12 col-md-8 offset-md-2">
        <div className="routine-form">
          <Box
            component="form"
            p={1}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Name"
                className="form-control mb-3"
                name="name"
                placeholder="What would you like to name your routine?"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField
                id="description"
                name="description"
                label="Description"
                placeholder="What is your routine about? (Ex. Type of routine, body part split, etc.)"
                className="form-control mb-3"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary container-fluid">
              Create
            </button>
            <button
              onClick={cancel}
              className="btn btn-secondary container mt-1"
            >
              Cancel
            </button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RoutineForm;
