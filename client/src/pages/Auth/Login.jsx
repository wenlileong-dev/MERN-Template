import React, { useState } from "react";
import axios from "axios";

import AuthPopout from "./../../components/Popout/AuthPopout";

function Login() {
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [popout, setPopout] = useState(0);
  const [authMsg, setAuthMsg] = useState({});

  function handleChange(event) {
    let { name, value } = event.target;

    if (name === "username") {
      setAuth((prevValue) => {
        return {
          username: value,
          password: prevValue.password,
        };
      });
    } else if (name === "password") {
      setAuth((prevValue) => {
        return {
          username: prevValue.username,
          password: value,
        };
      });
    }
  }

  const togglePopup = () => {
    setPopout(!popout);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`/api/auth/login`, auth).then((res) => {
      //   console.log(res);
      console.log(res.data);
      setAuthMsg(res.data);
      setAuth({ username: "", password: "" });
      togglePopup();
    });
  };

  const handleLogout = async () => {
    axios.get(`/api/auth/logout`).then((res) => {
      //   console.log(res);
      console.log(res.data);
      setAuthMsg(res.data);
      togglePopup();
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={auth.username}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={auth.password}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      {popout && authMsg && (
        <AuthPopout handleClose={togglePopup} authMsg={authMsg} />
      )}
    </div>
  );
}

export default Login;