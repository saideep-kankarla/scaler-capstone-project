import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Username:', username, 'Password:', password);
    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-form">
      <h3>Audiio - Sign In</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          type="email"
          id="username"
          label="E-mail Id"
          name="emailId"
          helperText="Please enter a valid E-mail ID"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          helperText="Please enter a registered password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ margin: '1rem 1rem 1rem 0rem' }}
          endIcon={<LoginIcon />}
        >
          Sign In
        </Button>
        <Link to="/register">
          <Button
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<HowToRegIcon />}
          >
            Register
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
