import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Button } from '@mui/material';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <>
    <Card 
      sx={{ 
          width: 500,
          backgroundColor: "#2e2e2e", 
          color: "antiquewhite", 
          outline: "#e6855f solid 10px",
          ml: 10,
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center'
          }}>
    <form className="form-control" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
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
          type="password"
          autoComplete="current-password"
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
    </Card>
    </>
  );
}

export default LoginForm;
