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
      <h1>Welcome to Scene Report</h1>
      <h2>A journey of discovery awaits you!</h2>
      <div className="grid">
          <RegisterForm />
            <h4>Already a Member?</h4>
            <Button variant="contained" color="success" onClick={onLogin}>
              Login
            </Button>
      </div>
    </div>
  );
}

export default LandingPage;
