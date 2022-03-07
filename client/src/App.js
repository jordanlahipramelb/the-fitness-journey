import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import FitnessJourneyApi from "./api";
import "./App.css";

import LoadingPage from "./components/common/LoadingPage";
import UserContext from "./components/auth/UserContext";
import Navbar from "./components/navbar/Navbar";
import Routes from "./routes/Routes";
import Footer from "./components/common/Footer";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "fitnessjourney-token";

/** Fitness Journey Application
 *
 * - currentUser: user obj from API. How to tell if someone is logged in. This is passed down through the UserContext Provider.
 * - userInfoLoaded: boolean to say whether the user's info was loaded or not. This handles the Loading component.
 * - token: for logged in users in order to authenticate with JWT
 *
 * App -> Routes
 */

function App() {
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          let { username } = jwt.decode(token);

          // adds token to API class in order to use it to call API
          FitnessJourneyApi.token = token;

          // set the current user state
          let currentUser = await FitnessJourneyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("Error with getCurrentUser");
          setCurrentUser(null);
        }
      }
      // set to true when the info is loaded
      setUserInfoLoaded(true);
    };
    // set to false while async getCurrentUser runs.
    // Once data/error is fetched, this is set back to false in order to control the Loading component
    setUserInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout.
   * Empties current user and token
   */
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  /** Handles site-wide register */

  const register = async (data) => {
    try {
      let token = await FitnessJourneyApi.register(data);

      // set the returned token to the token state of the app
      setToken(token);

      return { success: true };
    } catch (errors) {
      console.error("register failed", errors);

      return { success: false, errors };
    }
  };

  /** Handles site-wide login */

  const login = async (data) => {
    try {
      // call API login, returns token
      let token = await FitnessJourneyApi.login(data);

      // set the returned token to the token state of the app
      setToken(token);

      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  };

  if (!userInfoLoaded) return <LoadingPage />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar logout={logout} />
        <Routes login={login} register={register} />
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
