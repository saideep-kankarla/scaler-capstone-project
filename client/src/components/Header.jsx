import { Fragment } from 'react';
import Logo from '../assets/logo.png';
import { Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <a href="/">
          <img src={Logo} style={{ height: '34px' }} alt="Audiio Logo" />
        </a>

        <Stack direction="row" spacing={2}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/admin">Admin Login</Link>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Header;
