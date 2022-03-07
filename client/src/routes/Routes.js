import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import Homepage from "../components/home/Homepage";
import PostList from "../components/posts/PostList";
import Post from "../components/posts/Post";
import NewPost from "../components/posts/NewPost";
import ExerciseList from "../components/exercises/ExerciseList";
import ExerciseDetails from "../components/exercises/ExerciseDetails";
import UserDashboard from "../components/users/UserDashboard";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ProfileForm from "../components/users/ProfileForm";
import RoutineList from "../components/routines/RoutineList";
import Routine from "../components/routines/Routine";
import NewRoutine from "../components/routines/NewRoutine";
import UserProfile from "../components/users/UserProfile";

import NewLog from "../components/logs/NewLog";
import Log from "../components/logs/Log";
import LogList from "../components/logs/LogList";

/** Routes Component
 *
 * Consists of all possible routes in the app
 *
 * Child of App
 */

const Routes = ({ login, register }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>

      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>

      <Route exact path="/register">
        <RegisterForm register={register} />
      </Route>

      <ProtectedRoutes exact path="/exercises">
        <ExerciseList />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/exercises/:id">
        <ExerciseDetails />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/routines/new">
        <NewRoutine />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/routines">
        <RoutineList />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/routines/:routineId">
        <Routine />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/forum/new">
        <NewPost />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/forum">
        <PostList />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/forum/:postId">
        <Post />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/athlete">
        <UserDashboard />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/athletes/:username">
        <UserProfile />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/athlete/edit">
        <ProfileForm />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/logs/new">
        <NewLog />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/logs">
        <LogList />
      </ProtectedRoutes>

      <ProtectedRoutes exact path="/logs/:logId">
        <Log />
      </ProtectedRoutes>

      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
