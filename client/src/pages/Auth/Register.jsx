import React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import RegisterErrorMsg from "./RegisterErrorMsg";

function Register(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errorMsg, setErrorMsg] = React.useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await axios.post("/api/user/register", {
      email: values.email,
      password: values.password,
    });
    if (result.data.status === 200) {
      props.setUser(result.data.data);
      window.location = "/profile";
    } else {
      setErrorMsg(result.data.errorMsg);
    }
  };
  return (
    <React.Fragment>
      <Container>
        <Box sx={{ py: 5, width: "50ch" }} className="center">
          <Typography variant="h4" gutterBottom component="div">
            Register
          </Typography>

          <form onSubmit={handleLogin}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              {errorMsg.length !== 0 &&
                errorMsg.map((msg, i) => {
                  return <RegisterErrorMsg msg={msg} key={`msg${i}`} />;
                })}
              <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Email"
                  required
                  value={values.email}
                  onChange={handleChange("email")}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  required
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button variant="contained" type="submit" sx={{ mx: 2 }}>
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Register;
