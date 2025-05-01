import { Fragment } from 'react';
import { Box, Grid, Divider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';

export default function Layout() {
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

        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid size={12}>
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                </Routes>
              </main>
            </Grid>
          </Grid>
        </Box>
        <Divider />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid size={12}>
              <Footer />
            </Grid>
          </Grid>
        </Box>
      </BrowserRouter>
    </Fragment>
  );
}
