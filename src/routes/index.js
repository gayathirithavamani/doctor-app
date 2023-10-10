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
import BarChart from "../pages/populations/CanvasJSChart";
import Percentage from "../pages/populations/percentage";
import HighchartsComponent from "../pages/populations/stackedChart";

import AssessmentBarView from "../pages/assessment/AssesmentBarChart";
import Adv1 from "../pages/assessment/Adv1";
import Adv2 from "../pages/assessment/Adv2";
import Cat1 from "../pages/assessment/Cat1";
import Cat3 from "../pages/assessment/Cat3";
import Cat4 from "../pages/assessment/Cat4";
import Fall1 from "../pages/assessment/Fall1";
import Fall2 from "../pages/assessment/Fall2";
import Skin1 from "../pages/assessment/Skin1";
import Skin2 from "../pages/assessment/Skin4";
import Skin5 from "../pages/assessment/Skin4";

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
        {/* <Route path="/populationView" element={<BarChart />} /> */}
        <Route path="/percentageView" element={<Percentage />} />
        <Route path="/stackedView" element={<HighchartsComponent tableView={true}/>} />
        <Route path="/assessmentView" element={<AssessmentBarView />} />
        <Route path="/adv1" element={<Adv1 />} />
        <Route path="/adv2" element={<Adv2 />} />
        <Route path="/cat1" element={<Cat1 />} />
        <Route path="/cat3" element={<Cat3 />} />
        <Route path="/cat4" element={<Cat4 />} />
        <Route path="/fall1" element={<Fall1 />} />
        <Route path="/fall2" element={<Fall2 />} />
        <Route path="/skin1" element={<Skin1 />} />
        <Route path="/skin4" element={<Skin5/>} />
      </Routes>
    </Router>
  );
};

export { HomeRoutes };
