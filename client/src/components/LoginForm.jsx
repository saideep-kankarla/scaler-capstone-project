import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

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
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="email"
          id="username"
          label="E-mail Id"
          name="emailId"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: '1rem' }}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
