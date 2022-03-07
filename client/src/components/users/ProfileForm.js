import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import FitnessJourneyApi from "../../api";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
import "./ProfileForm.css";

/** Profile Form component
 *
 * Allows updating of user profile data
 */

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    password: "",
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    city: currentUser.city,
    state: currentUser.state,
    bio: currentUser.bio,
    fitnessType: currentUser.fitnessType,
    imageUrl: currentUser.imageUrl,
  });
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
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
  const listStates = loop(states);
  const listTypes = loop(fitnessTypes);

  /** Handle form submission:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      city: formData.city,
      state: formData.state,
      bio: formData.bio,
      fitnessType: formData.fitnessType,
      imageUrl: formData.imageUrl,
    };

    let username = formData.username;
    let updatedUser;

    try {
      // calls API when form is submitted
      updatedUser = await FitnessJourneyApi.saveProfile(username, profileData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData((formData) => ({ ...formData, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  };

  /** Handle form data changing */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
    setFormErrors([]);
  };

  return (
    <div className="ProfileForm py-4 mb-4">
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-between align-items-center">
                <h2>{formData.username}</h2>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>

                  <li class="breadcrumb-item active" aria-current="page">
                    Edit Profile
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div className="profile-form">
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
                label="First Name"
                variant="outlined"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />

              <TextField
                id="outlined-basic"
                label="Image URL"
                variant="outlined"
                name="imageUrl"
                className="form-control"
                value={formData.imageUrl}
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
                value={formData.email}
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
                value={formData.city}
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
                  value={formData.state}
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
                value={formData.bio}
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
                  value={formData.fitnessType}
                  onChange={handleChange}
                >
                  {listTypes}
                </Select>
              </FormControl>

              <InputLabel id="password">
                Confirm password to make changes:
              </InputLabel>
              <FormControl fullWidth>
                <TextField
                  id="filled-password-input"
                  label="Password"
                  labelId="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="form-control"
                  required
                />
              </FormControl>

              <div className="mt-4">
                {formErrors.length ? (
                  <Alert type="danger" messages={formErrors} />
                ) : null}

                {saveConfirmed ? (
                  <Alert type="success" messages={["Updated successfully."]} />
                ) : null}
              </div>
              <button
                className="btn btn-primary btn-block mt-4"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

const loop = (listName) => {
  return listName.map((item) => (
    <MenuItem key={item} value={item}>
      {item}
    </MenuItem>
  ));
};
export default ProfileForm;
