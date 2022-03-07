import React, { useState } from "react";

import { Box, TextField } from "@mui/material";
import "./LogForm.css";

/** Log Form Component
 *
 * Allows input of date
 *
 * Child of NewLog Component
 */

const LogForm = ({ log, addLog, cancel }) => {
  const [formData, setFormData] = useState({
    date: log.date,
    username: log.username,
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

    addLog(formData);
  };

  return (
    <div className="LogForm mb-4">
      <div className="col-md-8 offset-md-2">
        <div className="log-form">
          <Box component="form" onSubmit={handleSubmit}>
            <div>
              <TextField
                required
                variant="outlined"
                className="form-control"
                id="date"
                type="date"
                name="date"
                label="Date of Log"
                value={formData.date}
                onChange={handleChange}
              />
              <small>
                <p className="text-muted mb-0 mt-2 px-2">
                  Select a date above.
                </p>
                <p className="text-muted mb-3 px-2">
                  Once created, open your created log and add your entries.
                </p>
              </small>
            </div>

            <button type="submit" className="btn btn-primary container mt-2">
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

export default LogForm;
