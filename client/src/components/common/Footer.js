import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

/** Footer Component
 *
 * Sitewide
 * Located in App component
 */

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="footer-info">
                <h3>Fitness Journey</h3>
                <p>1245 Lorem Ipsum</p>
                <p>HI 48575, USA</p>

                <p>
                  <strong>Phone:</strong> +1 808 845 8787
                </p>
                <p>
                  <strong>Email:</strong> jlahipramelb@gmail.com
                </p>
                <div className="social-links mt-3 mb-4">
                  <a
                    href="https://github.com/jordanlahipramelb"
                    className="github"
                  >
                    <i className="fab fa-github"></i>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/jordan-lahip-ramelb/"
                    className="linkedin"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i class="fas fa-chevron-right"></i> <Link to="/">Home</Link>
                </li>
                <li>
                  <i class="fas fa-chevron-right"></i>
                  <Link to="/logs">Logs</Link>
                </li>
                <li>
                  <i class="fas fa-chevron-right"></i>
                  <Link to="/routines">Routines</Link>
                </li>
                <li>
                  <i class="fas fa-chevron-right"></i>
                  <Link to="/exercises">Exercises</Link>
                </li>
                <li>
                  <i class="fas fa-chevron-right"></i>
                  <Link to="/forum">Forum</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright text-center pt-3">
          &copy; Copyright <b>Jordan Lahip-Ramelb</b>. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
