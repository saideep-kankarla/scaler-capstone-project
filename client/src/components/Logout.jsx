const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect to login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
