import React, { useState } from 'react';
import { Alert, TextField, Button, Snackbar } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link } from 'react-router-dom';
import axios from '../utils/axios-config';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('you are on register form');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
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

    try {
      // Handle login logic here
      const apiBaseUrl = import.meta.env.VITE_NODE_API_URL;

      const response = await axios.post(`${apiBaseUrl}/api/users/register`, {
        name,
        phone,
        email,
        password,
      });
      console.log('Successfully Registered', response.data);

      const { status } = response.data;
      if (status === 201) {
        setOpen(true);
        setMessage(response.data.message);
      }
    } catch (err) {
      console.error('Failed user save', err.status);
      setMessage(err.response.data.error);
      setOpen(true);
    }
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterForm;
