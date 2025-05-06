import { Fragment, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

import {
  Box,
  Stack,
  Typography,
  Paper,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
  // check for logged in user for protected routes
  const navigate = useNavigate();
  const auth = useAuth();
  if (auth?.user === null) {
    navigate('/login');
  }

  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      {auth && auth?.user?.name ? (
        <div>
          <Stack direction="row">
            <Paper
              variant="elevation"
              elevation={24}
              className="profileContainer"
            >
              <Typography color="textPrimary" gutterBottom variant="h5">
                {auth?.user?.role.toUpperCase()} work area
              </Typography>
              <Divider />
              <Box sx={{ flexGrow: 1 }}>
                <Grid className="profileGrids" container spacing={4}>
                  <Grid className="profileLeftSection" size={2}>
                    <List component="nav">
                      <Link to="/profile" state={{ from: location.pathname }}>
                        <ListItemButton
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1)}
                        >
                          <ListItemText primary="Profile Info" />
                        </ListItemButton>
                      </Link>
                      {auth?.user?.role === 'admin' ? (
                        <Fragment>
                          <Divider />
                          <Link
                            to="usersTable"
                            state={{ from: location.pathname }}
                          >
                            <ListItemButton
                              selected={selectedIndex === 2}
                              onClick={(event) => handleListItemClick(event, 2)}
                            >
                              <ListItemText primary="Users" />
                            </ListItemButton>
                          </Link>

                          <Link
                            to="addAlbum"
                            state={{ from: location.pathname }}
                          >
                            <ListItemButton
                              selected={selectedIndex === 3}
                              onClick={(event) => handleListItemClick(event, 3)}
                            >
                              <ListItemText primary="Add Album" />
                            </ListItemButton>
                          </Link>

                          <Link
                            to="albumsTable"
                            state={{ from: location.pathname }}
                          >
                            <ListItemButton
                              selected={selectedIndex === 4}
                              onClick={(event) => handleListItemClick(event, 4)}
                            >
                              <ListItemText primary="List Album(s)" />
                            </ListItemButton>
                          </Link>
                        </Fragment>
                      ) : (
                        ''
                      )}
                    </List>
                  </Grid>
                  <Grid className="profileMainSection" size={10}>
                    <Outlet />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Stack>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ProfilePage;
