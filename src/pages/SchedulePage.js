import React from "react";
import { useLocation } from "react-router-dom";
import Schedule from "./Schedule";

// Page to view a specific schedule user created.

const SchedulePage = () => {
  const location = useLocation();
  const scheduleId = location.state.scheduleId;
  return (
    <div>
      <Schedule scheduleId={scheduleId} />
    </div>
  );
};

export default SchedulePage;
