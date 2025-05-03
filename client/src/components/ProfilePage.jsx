import React from 'react';
import { useAuth } from '../hooks/AuthProvider';

const ProfilePage = () => {
  const auth = useAuth();

  return (
    <>
      {auth && auth?.user ? (
        <div>You are on a Profile Page</div>
      ) : (
        <div>YOu will be redirected to /login</div>
      )}
    </>
  );
};

export default ProfilePage;
