import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import "./RoutineDetailsForm.css";
import { Link } from "react-router-dom";

/** Routine Details Form Component
 *
 * Allows editing of routine name and description
 *
 * Child of Routine Component
 */

const RoutineDetailsForm = ({ routine, toggleEdit, updateRoutine }) => {
  const [formData, setFormData] = useState({
    username: routine[0].username,
    name: routine[0].name,
    description: routine[0].description,
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

    updateRoutine(formData);
  };

  return (
    <div className="RoutineDetailsForm mb-4">
      <div className="col-md-10 offset-md-1">
        <section id="breadcrumb" className="pb-2">
          <nav aria-label="breadcrumb">
            <div className="d-flex justify-content-between align-items-center">
              <h2>{formData.name}</h2>
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
                  Edit Routine
                </li>
              </ol>
            </div>
          </nav>
        </section>
      </div>

      <div className="col-md-8 offset-md-2">
        <div className="routine-form">
          <Box component="form" onSubmit={handleSubmit}>
            <div>
              <TextField
                required
                id="name"
                label="Name"
                variant="outlined"
                name="name"
                className="form-control mb-2"
                placeholder="What is the name of your routine?"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                id="description"
                name="description"
                label="Description"
                placeholder="What is the decription of your routine?"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary container mt-2">
              Save
            </button>
            <button
              className="btn btn-secondary container mt-1"
              onClick={toggleEdit}
            >
              Back
            </button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RoutineDetailsForm;
