import React from 'react';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  console.log('sasa', auth, auth?.user?.name);

  if (auth?.user === null) {
    navigate('/login');
  }

  return (
    <>
      {auth && auth?.user ? (
        <div>Welcome {auth?.user?.name}, You are on a Profile Page</div>
      ) : (
        <div>YOu will be redirected to /login</div>
      )}
    </>
  );
};

export default ProfilePage;
