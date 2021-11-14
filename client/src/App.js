import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NavagationBar from "./components/NavigationBar/NavagationBar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";

import authCheck from "./common/getUserInfo";
import "./App.css";
function App() {
  const [user, setUser] = useState({});
  const [authMsg, setAuthMsg] = useState(false);

  useEffect(() => {
    authCheck(setUser, setAuthMsg);
  }, []);
  return (
    <React.Fragment>
      <Router>
        <NavagationBar user={user} />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
          <Route
            path="/register"
            element={<Register setUser={setUser} />}
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
