import React from "react";
import Forms from "./components/StaffForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./staffStyle.css";

const staffIndex = () => {
  return (
    <div className="bar">
      <div className="container">
        <Forms />
      </div>
    </div>
  );
};

export default staffIndex;
