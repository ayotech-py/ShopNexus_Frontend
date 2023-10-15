import React from "react";
import "../css/loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading</p>
    </div>
  );
};

export default Loading;
