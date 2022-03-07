import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Homepage.css";

/** Homepage
 *
 * Shows welcome message or login/register buttons.
 *
 * App -> Routes -> Homepage
 */

const Homepage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <section id="homepage-top" className="d-flex align-items-center">
        <div className="container">
          <h1 className="font-weight-bold">
            Welcome to <span>Fitness Journey</span>
          </h1>

          {currentUser ? <h2>Hello again, {currentUser.firstName}!</h2> : null}
        </div>
      </section>

      <section id="services" className="bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box">
                <div className="icon">
                  <i className="fas fa-dumbbell"></i>
                </div>
                <h4 className="title">
                  <Link to="/exercises">Exercises</Link>
                </h4>
                <p className="description">
                  Take a look at our library of exercises which includes
                  pictures, instructions, equipment type, and muscles worked.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box">
                <div className="icon">
                  <i className="fas fa-dumbbell"></i>
                </div>
                <h4 className="title">
                  <Link to="/routines">Routines</Link>
                </h4>
                <p className="description">
                  Take a look at our library of routines which were created by
                  athletes from our community.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box">
                <div className="icon">
                  <i className="fas fa-dumbbell"></i>
                </div>
                <h4 className="title">
                  <Link to="forum">Forum</Link>
                </h4>
                <p className="description">
                  Have questions? Ask our community and obtain answers or
                  explore other topics asked by our athletes.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box">
                <div className="icon">
                  <i className="fas fa-dumbbell"></i>
                </div>
                <h4 className="title">
                  <Link to="logs">Logs</Link>
                </h4>
                <p className="description">
                  Get inspired and take a look at what routines/exercises are
                  being logged by our athletes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
