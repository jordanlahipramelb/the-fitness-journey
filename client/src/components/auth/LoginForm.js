import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import { Box, TextField } from "@mui/material";
import "./LoginForm.css";

/** Login Form Component
 *
 * login function prop passed in through App
 *
 * - formData: data retrieved from inputs
 * - formErrors: errors that are pushed from the backend if inputted data does not meet requirements
 */

const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  /** Handle form submission. */

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // login function prop passed in from API->App->Routes
    let result = await login(formData);

    // redirect to companies if successful
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  };

  /** Updates form field when typing */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const { username, password } = formData;

  return (
    <div className="LoginForm py-4">
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
                    Login
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div className="login-form">
            <h3 className="mb-3">Login</h3>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                className="form-control mb-2"
                name="username"
                value={username}
                onChange={handleChange}
                autoComplete="username"
                required
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

              <div className="mt-4">
                {formErrors.length ? (
                  <Alert type="danger" messages={formErrors} />
                ) : null}
              </div>
              <button
                className="btn btn-primary container"
                onSubmit={handleSubmit}
              >
                Login
              </button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
