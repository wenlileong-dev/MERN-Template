import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import getUserInfo from "../../common/getUserInfo";

function Profile() {
  const [user, setUser] = useState({});
  const [authMsg, setAuthMsg] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      await getUserInfo(setUser, setAuthMsg);
      if (authMsg) {
        setTimeout(() => {
          window.location = "/login";
        }, 1000);
      }
    };
    checkAuth();
  }, [authMsg]);

  const handleLogout = async () => {
    await axios.post("/api/user/logout", {});
    setUser({});
    window.location = "/";
  };
  return (
    <React.Fragment>
      <Container fixed>
        <Box className="center">
          {Object.keys(user).length !== 0 && (
            <>
              <h1>Profile Page</h1>
              <p>{user.email}</p>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {authMsg && <p>Not Authenticated, redirecting to login page</p>}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Profile;
