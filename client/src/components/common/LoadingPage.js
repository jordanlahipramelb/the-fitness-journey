import React from "react";
import { BallTriangle } from "react-loader-spinner";
import "./LoadingPage.css";

/** Returns Loading when API is called. */

const LoadingPage = () => {
  return (
    <div className="LoadingPage">
      <BallTriangle color="gray" />
    </div>
  );
};

export default LoadingPage;
