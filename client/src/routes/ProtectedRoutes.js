import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../components/auth/UserContext";

/** Component that redirects non users from private routes.
 *
 * currentUser: Global variable provided by UserContext in App
 *      - obtains currentUser, whuch verifies if a user is logged in.
 */

const ProtectedRoutes = ({ exact, path, children }) => {
  // passed from App
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
};

export default ProtectedRoutes;
