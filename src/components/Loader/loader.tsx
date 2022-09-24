import React from "react";
import "./index.scss";

const Loader = () => {
  return (
    <div className="loader-cont">
      <img className="loader" src="load-gif.gif" alt="" />
      <p>
        Loading
        <span className="jumping-dots">
          <span className="dot-1">.</span>
          <span className="dot-2">.</span>
          <span className="dot-3">.</span>
        </span>
      </p>
    </div>
  );
};

export default Loader;
