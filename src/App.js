import React from "react";

import { BrowserRouter } from "react-router-dom";
import MainLayout from "./pages/layout/layout";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
