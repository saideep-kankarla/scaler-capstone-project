import { useContext, createContext, useState, useEffect } from 'react';
// import axios from '../utils/axios-config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('audiioAuthtoken') || null,
  );

  // useEffect(() => {
  //   if (token) {
  //     axios
  //       .get('/api/verify-token', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         setUser(response.data.user);
  //       })
  //       .catch((err) => {
  //         localStorage.removeItem('audiioAuthtoken');
  //         setToken(null);
  //         console.error('Failed token verification', err.status);
  //       });
  //   }
  // }, [token]);

  // Auto logout after login
  useEffect(() => {
    if (token) {
      const tokenExpirationTime = import.meta.env.VITE_JWT_EXPIRATION;
      const timer = setTimeout(() => {
        logout();
      }, tokenExpirationTime);
      return () => clearTimeout(timer);
    }
  }, [token]);

  const login = async (user) => {
    try {
      localStorage.setItem('audiioAuthtoken', user.token);
      setUser(user);
      setToken(user.token);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('audiioAuthtoken');
    console.log('Auto logged out');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
