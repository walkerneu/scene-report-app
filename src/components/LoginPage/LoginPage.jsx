import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <center>
        <LoginForm />
        <Button
          sx={{ mt: 5}}
          type="button"
          variant="outlined"
          color="secondary"
          onClick={() => {
            history.push("/registration");
          }}
        >
          Switch to Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
