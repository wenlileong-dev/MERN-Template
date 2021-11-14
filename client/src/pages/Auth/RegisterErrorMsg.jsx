import React from "react";
import Alert from "@mui/material/Alert";

function RegisterErrorMsg(props) {
  return <Alert severity="error">{props.msg}</Alert>;
}

export default RegisterErrorMsg;
