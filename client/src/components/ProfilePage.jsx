import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
} from 'react-router-dom';

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
  const navigate = useNavigate();

  const auth = useAuth();

  const location = useLocation();

  if (auth?.user === null) {
    navigate('/login');
  }

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
                Account Details Of {auth?.user?.name}
              </Typography>
              <Divider />
              <Box sx={{ flexGrow: 1 }}>
                <Grid className="profileGrids" container spacing={4}>
                  <Grid className="profileLeftSection" size={3}>
                    <List component="nav">
                      <Link to="info" state={{ from: location.pathname }}>
                        <ListItemButton
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1)}
                        >
                          <ListItemText primary="Profile Info" />
                        </ListItemButton>
                      </Link>

                      <Divider />
                      <Link to="usersCrud" state={{ from: location.pathname }}>
                        <ListItemButton
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 2)}
                        >
                          <ListItemText primary="Users" />
                        </ListItemButton>
                      </Link>

                      <Link to="albumsCrud" state={{ from: location.pathname }}>
                        <ListItemButton
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 3)}
                        >
                          <ListItemText primary="Albums" />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Grid>
                  <Grid className="profileMainSection" size={9}>
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
