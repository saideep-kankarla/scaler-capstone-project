import { Box, Grid, Divider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../hooks/AuthProvider';

import Header from './Header.jsx';
import Home from './Home.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import AlbumPage from './AlbumPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import ProfileInfo from './ProfileInfo.jsx';
import UsersTable from './UsersTable.jsx';
import AlbumForm from './AlbumForm.jsx';
import AlbumsTable from './AlbumsTable.jsx';

import PremiumPage from './PremiumPage.jsx';

const Layout = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Box sx={{ flexGrow: 1 }}>
            <Grid className="header-container" container>
              <Grid size={12}>
                <Header />
              </Grid>
            </Grid>
          </Box>
          <Divider
            sx={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgb(255 255 255 / 12%)',
            }}
          />

          <Box className="mainAreaContainer">
            <Grid container>
              <Grid size={12}>
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/album/:id" element={<AlbumPage />} />

                    <Route path="/profile" element={<ProfilePage />}>
                      <Route path="info" element={<ProfileInfo />} />
                      <Route path="usersTable" element={<UsersTable />} />
                      <Route path="addAlbum" element={<AlbumForm />} />
                      <Route path="albumsTable" element={<AlbumsTable />} />
                    </Route>

                    <Route path="/premium" element={<PremiumPage />} />
                  </Routes>
                </main>
              </Grid>
            </Grid>
          </Box>
          <Divider />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
