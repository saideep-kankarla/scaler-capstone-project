import { Fragment } from 'react';
import { Box, Grid, Divider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header.jsx';
import Home from './Home.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import AlbumPage from './AlbumPage.jsx';

const Layout = () => {
  return (
    <Fragment>
      <BrowserRouter>
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

        <Box className="mainContainer" sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid size={12}>
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/album/:id" element={<AlbumPage />} />
                </Routes>
              </main>
            </Grid>
          </Grid>
        </Box>
        <Divider />
      </BrowserRouter>
    </Fragment>
  );
};

export default Layout;
