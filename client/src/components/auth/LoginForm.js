import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

		// login function prop passed in from api->App->Routes
		let result = await login(formData);

		if (result.success) {
			history.push("/");
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
		<div className="LoginForm">
			<div className="container h-100">
				<div className="d-flex align-items-center justify-content-center h-100">
					<div className="login-form mb-5">
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
								placeholder="testuser"
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
								placeholder="password"
								className="form-control"
								required
							/>
							<div className="test-credentials">
								<h6>Demo User Credentials</h6>
								<p>
									<b>Username:</b> testuser
								</p>
								<p>
									<b>Password:</b> password
								</p>
							</div>

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
