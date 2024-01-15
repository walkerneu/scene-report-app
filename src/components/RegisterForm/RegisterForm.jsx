import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="form-control" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
      <Typography gutterBottom variant="overline" display="block">
          Username:
        </Typography>
        <TextField
          sx={{mb: "15px"}}
          label="Username"
          placeholder="Username"
          multiline
          maxRows={4}
          variant="filled"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
      <Typography gutterBottom variant="overline" display="block">
          Password:
        </Typography>
        <TextField
          sx={{mb: "15px"}}
          label="Password"
          placeholder="Password"
          type="password"
          multiline
          maxRows={4}
          variant="filled"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <Button
          sx={{mb: "15px"}} 
          variant="contained" 
          color="success"
          type="submit"
          value="Log In"
          >
        Submit
      </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
