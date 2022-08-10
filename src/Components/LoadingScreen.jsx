import React from "react";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="card-loading">
      <h1>Loading...</h1>
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>          
      </div>
    </div>
  );
};

export default LoadingScreen;
