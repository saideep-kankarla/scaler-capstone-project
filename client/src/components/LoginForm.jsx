import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link } from 'react-router-dom';

import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('saideep.k@gmail.com');
  const [password, setPassword] = useState('mygoal');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle login logic here
      const apiBaseUrl = import.meta.env.VITE_NODE_API_URL;

      const response = await axios.post(`${apiBaseUrl}/api/users/login`, {
        email,
        password,
      });
      console.log('Successfully authenticated', response, response.data);

      const { status, token } = response.data;
      if (status === 200) {
        localStorage.setItem('audiioAuthtoken', token);
      }
    } catch (err) {
      console.error('Failed login', err.status);
    }

    // Reset form fields
    setEmail('');
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
          label="E-mail Id"
          name="emailId"
          helperText="Please enter a valid E-mail ID"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
