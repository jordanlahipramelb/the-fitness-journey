import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "./RegisterForm.css";

/** Register Form Component
 *
 * register function passed in from App
 *
 * - formData: data retrieved from inputs
 * - formErrors: errors that are pushed from the backend if inputted data does not meet requirements
 */

const RegisterForm = ({ register }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    bio: "",
    fitnessType: "",
    imageUrl:
      "https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg", // Default image photo
  });
  const [formErrors, setFormErrors] = useState([]);
  const states = [
    "---",
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];
  const fitnessTypes = ["---", "Bodybuilder", "Powerlifter", "Powerbuilder"];
  const listStates = map(states);
  const listTypes = map(fitnessTypes);

  /** Handle form submission. */

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let result = await register(formData);

    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  };

  /** Updates form field when typing */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const {
    username,
    password,
    email,
    firstName,
    lastName,
    city,
    state,
    bio,
    fitnessType,
    imageUrl,
  } = formData;

  return (
    <div className="SignupForm py-4 mb-4">
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

                  <li class="breadcrumb-item active" aria-current="page">
                    Register
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div className="register-form">
            <h2 className="mb-3">Sign Up</h2>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                required
                id="outlined-basic"
                variant="outlined"
                className="form-control mb-2"
                name="username"
                label="Username"
                value={username}
                onChange={handleChange}
                autoComplete="username"
              />

              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                autoComplete="current-password"
                className="form-control"
                required
              />

              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                name="firstName"
                className="form-control"
                value={firstName}
                onChange={handleChange}
                required
              />

              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                name="lastName"
                className="form-control"
                value={lastName}
                onChange={handleChange}
              />

              <TextField
                id="outlined-basic"
                label="Image URL"
                variant="outlined"
                name="imageUrl"
                className="form-control"
                value={imageUrl}
                onChange={handleChange}
                helperText="Insert image URL above, or leave as default photo."
              />

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={handleChange}
                helperText="We'll never share your email with anyone else."
                required
              />

              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                name="city"
                className="form-control"
                value={city}
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel id="state">State</InputLabel>

                <Select
                  id="state"
                  name="state"
                  labelId="state"
                  label="State"
                  className="form-control"
                  value={state}
                  onChange={handleChange}
                >
                  {listStates}
                </Select>
              </FormControl>

              <TextField
                id="bio"
                name="bio"
                label="Bio"
                className="form-control"
                value={bio}
                onChange={handleChange}
                multiline
                rows={3}
              />
              <FormControl fullWidth>
                <InputLabel id="fitnessType">Fitness Type</InputLabel>
                <Select
                  id="fitnessType"
                  labelId="fitnessType"
                  name="fitnessType"
                  label="Fitness Type"
                  className="form-control"
                  value={fitnessType}
                  onChange={handleChange}
                >
                  {listTypes}
                </Select>
              </FormControl>
              <div className="mt-4">
                {formErrors.length ? (
                  <Alert type="danger" messages={formErrors} />
                ) : null}
              </div>
              <button
                type="submit"
                className="btn btn-primary container"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

const map = (listName) => {
  return listName.map((type) => (
    <MenuItem key={type} value={type}>
      {type}
    </MenuItem>
  ));
};

export default RegisterForm;
