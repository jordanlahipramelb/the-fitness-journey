import React, { useState } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import "./SearchForm.css";

/** Search Form Component
 *
 * Child of ___List Components
 * Used to search for titles in list
 *
 * searchTerm: term retrieved from input
 *
 */

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState("");

  /** Handles submission of form */

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);

    setSearchTerm(searchTerm.trim());
  };

  /** Updates form field when typing */

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  return (
    <div className="SearchForm mb-4">
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          placeholder="Enter search term"
          id="outlined-basic"
          label="Search Term"
          variant="outlined"
          name="searchTerm"
          className="form-control"
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  baseClassName="fas"
                  className="fas fa-search"
                  type="submit"
                  edge="end"
                  color="primary"
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </div>
  );
};

export default SearchForm;
