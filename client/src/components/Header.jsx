import { Fragment, useState } from 'react';
import Logo from '../assets/logo.png';
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { deepOrange } from '@mui/material/colors';
import { PersonOutline, CardMembership, Logout } from '@mui/icons-material';
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const auth = useAuth();

  const initials = auth.user?.name?.charAt(0).toUpperCase();

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
          {auth.user ? (
            <Fragment>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar
                    sx={{ width: 32, height: 32, bgcolor: deepOrange[500] }}
                  >
                    {initials}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Fragment>
          ) : (
            <Typography gutterBottom variant="button">
              <Link to="/login">Login</Link>
            </Typography>
          )}
        </Stack>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        sx={{ width: 530 }}
        slotProps={{
          paper: {
            elevation: 0,

            sx: {
              width: '200px',
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonOutline fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Account" />
        </MenuItem>
        {!auth.premiumSubscribed ? (
          <div style={{ padding: '6px 0' }}>
            <Divider />
            <MenuItem
              sx={{ width: '100%', textAlign: 'left' }}
              onClick={handleClose}
            >
              <ListItemIcon>
                <CardMembership fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Get Premium" />
            </MenuItem>
          </div>
        ) : (
          ''
        )}
        <Divider />
        <MenuItem onClick={auth.logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default Header;
