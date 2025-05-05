import { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from '../utils/axios-config';

import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('saideep.k@gmail.com');
  const [password, setPassword] = useState('mygoal');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('you are on register form');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle login logic here
      const apiBaseUrl = import.meta.env.VITE_NODE_API_URL;

      const response = await axios.post(`${apiBaseUrl}/api/users/login`, {
        email,
        password,
      });
      console.log('Successfully authenticated', response.data);

      const { status, user } = response.data;
      if (status === 200) {
        auth?.login(user);
        navigate('/');
      }
    } catch (err) {
      console.error('Failed login', err);
      setMessage(err.response.data.error);
      setOpen(true);
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
          helperText="Please enter a registered password"
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

export default LoginForm;
