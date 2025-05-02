import { Fragment } from 'react';
import Logo from '../assets/logo.png';
import { Box, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('audiioAuthtoken');
    localStorage.removeItem('isAudiioUserLogged');

    // Redirect to home page
    navigate('/', { replace: true });
  };

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
        <Link to="/">
          <img src={Logo} style={{ height: '34px' }} alt="Audiio Logo" />
        </Link>

        <Stack direction="row" spacing={2}>
          <Typography gutterBottom variant="button">
            <Link to="/pricing">Pricing</Link>
          </Typography>

          <Typography gutterBottom variant="button">
            |
          </Typography>
          <Typography gutterBottom variant="button">
            <Link to="/login">Login</Link>
          </Typography>
          <Typography gutterBottom variant="button">
            |
          </Typography>
          <Typography gutterBottom variant="button">
            <a href="javascript:void(0)" onClick={handleLogout}>
              Logout
            </a>
          </Typography>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Header;
