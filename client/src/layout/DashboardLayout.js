import React from "react";

import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="WebPage">
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
