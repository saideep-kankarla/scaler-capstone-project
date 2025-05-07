import { useContext, createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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

  useEffect(() => {
    if (user) {
      localStorage.setItem('audiiouser', JSON.stringify(user.name));
    } else {
      localStorage.removeItem('audiiouser');
    }
  }, [user]);

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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
