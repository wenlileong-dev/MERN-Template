import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NavagationBar from "./components/NavigationBar/NavagationBar";
import Login from "./pages/Auth/Login";
function App() {
  return (
    <React.Fragment>
      <Router>
        <NavagationBar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
