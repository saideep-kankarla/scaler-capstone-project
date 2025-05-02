import { createContext, useState } from 'react';
import { Box, Grid, Divider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header.jsx';
import Home from './Home.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import AlbumPage from './AlbumPage.jsx';

const AuthContext = createContext();

const Layout = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('audiioAuthtoken'));

  const login = (token) => {
    localStorage.setItem('audiioAuthtoken', token);
    setToken(token);
    // Fetch user data and update the user state
    // fetchUserData(token).then((userData) => setUser(userData));
  };

  const logout = () => {
    localStorage.removeItem('audiioAuthtoken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
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
    </AuthContext.Provider>
  );
};

export default Layout;
