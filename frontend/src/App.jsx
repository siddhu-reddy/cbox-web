import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";

function App() {

  return (
    <>
      <Router>
        <div className="pagecontainer">
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
