import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(
      'Full name:',
      name,
      'phone:',
      phone,
      'email:',
      email,
      'Password:',
      password,
    );
    // Reset form fields
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-form">
      <h3>Audiio - Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          type="text"
          id="name"
          label="Full Name"
          helperText="Please enter your first name and last name"
          name="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          type="number"
          id="phone"
          label="Contact Number"
          helperText="Please enter your 10 digit Mobile Number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          type="email"
          id="email"
          label="E-mail Id"
          helperText="Please enter a valid E-mail ID"
          name="email"
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
          helperText="Please enter a strong password"
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
          style={{ margin: '1rem 1rem 1rem 0rem' }}
          endIcon={<HowToRegIcon />}
        >
          Sign Up
        </Button>
        <Link to="/login">
          <Button variant="outlined" color="primary" size="large">
            Already Registered? Sign In
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
