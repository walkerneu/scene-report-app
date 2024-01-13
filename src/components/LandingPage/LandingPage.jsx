import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

import { Button } from '@mui/material';
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>Welcome to Scene Report!</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <Button variant="contained" color="success" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
