import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import "./Navbar.css";

/** Site-wide navigation bar
 *
 * Rendered by app.
 * logout function prop passed in by App.
 *
 */

const Navigation = ({ logout }) => {
  /** Provided from UserContext in App in order to obtain currentUser, which verifies if a user is logged in. */
  const { currentUser } = useContext(UserContext);

  /** Links that renders in the navigation bar if user is logged in.  */

  const loggedInUser = () => {
    return (
      <>
        <li className="nav-item">
          <Link to="/exercises" className="nav-link">
            Exercises
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/routines" className="nav-link">
            Routines
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/forum" className="nav-link">
            Forum
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/logs" className="nav-link">
            Logs
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/athlete" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={logout}>
            Log Out
          </Link>
        </li>
      </>
    );
  };

  /** Links that renders in the navigation bar if user is not logged in.  */

  const loggedOutUser = () => {
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
      </>
    );
  };

  return (
    <Navbar bg="dark" expand="md" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand className="title" href="/">
          <i className="fas fa-dumbbell"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Navbar.Brand className="title" href="/">
              FITNESS JOURNEY
            </Navbar.Brand>
            {currentUser ? loggedInUser() : loggedOutUser()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
