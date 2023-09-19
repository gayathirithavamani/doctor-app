import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";
import DashboardView from "../pages/dashboard/dashboardView";
import { Switch } from "antd";
import DashboardDonut from "../pages/dashboard/dashboardDonut";
import DashboardCovid from "../pages/dashboard/dashboardCovid";
import DashboardCovid2 from "../pages/dashboard/dashboardCovid2";
import DashboardBooster from "../pages/dashboard/dashboardBooster";

const HomeRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboardView" element={<DashboardView />} />
        <Route path="/dashboardDonut" element={<DashboardDonut />} />
        <Route path="/dashboardCovid" element={<DashboardCovid />} />
        <Route path="/dashboardCovid2" element={<DashboardCovid2 />} />
        <Route path="/dashboardBooster" element={<DashboardBooster />} />
      </Routes>
    </Router>
  );
};

export { HomeRoutes };
