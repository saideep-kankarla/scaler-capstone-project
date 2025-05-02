import jwt from 'jsonwebtoken';

const isLoggedIn = () => {
  const token = localStorage.getItem('audiioAuthtoken');
  if (token) {
    try {
      const decoded = jwt.decode(token);
      if (decoded.exp * 1000 > Date.now()) {
        return true;
      }
    } catch (err) {
      // Token is invalid or expired
      console.error('Err in Token', err.status);
    }
  }
  return false;
};

export default isLoggedIn;
