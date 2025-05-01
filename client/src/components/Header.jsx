import { Fragment } from 'react';
import Logo from '../assets/logo.png';
import { Box, Stack, Typography } from '@mui/material';
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
        <Link to="/">
          <img src={Logo} style={{ height: '34px' }} alt="Audiio Logo" />
        </Link>

        <Stack direction="row" spacing={2}>
          <Typography gutterBottom variant="button" sx={{ display: 'block' }}>
            <Link to="/pricing">Pricing</Link>
          </Typography>

          <Typography gutterBottom variant="button" sx={{ display: 'block' }}>
            <Link to="/login">Login</Link>
          </Typography>

          <Typography gutterBottom variant="button" sx={{ display: 'block' }}>
            <Link to="/admin">Admin</Link>
          </Typography>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Header;
