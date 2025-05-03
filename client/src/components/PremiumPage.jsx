import React from 'react';
import { useAuth } from '../hooks/AuthProvider';

const PremiumPage = () => {
  const auth = useAuth();

  return (
    <>
      {auth && auth.premiumSubscribed ? (
        <div>You are a premium user</div>
      ) : (
        <div>
          Get premium subscription | <a href="/">Make Payment</a>
        </div>
      )}
    </>
  );
};

export default PremiumPage;
