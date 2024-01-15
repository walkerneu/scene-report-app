import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button } from "@mui/material";

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <center>
      <RegisterForm />
        <Button
          sx={{ mt: 5, ml: 8 }}
          type="button"
          variant="outlined"
          color="secondary"
          onClick={() => {
            history.push('/login');
          }}
        >
          Switch to Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
