import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from './StripeForm';

import { Divider, Typography } from '@mui/material';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
// import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import axios from '../utils/axios-config';

const ProfileInfo = () => {
  // check for logged in user for protected routes
  const navigate = useNavigate();
  const auth = useAuth();
  if (auth?.user === null) {
    navigate('/login');
  }
  const apiBaseUrl = import.meta.env.VITE_NODE_API_URL;

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    axios
      .post(
        `${apiBaseUrl}/api/payments/create-payment-intent`,
        auth?.user?._id,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((response) => setClientSecret(response.data.clientSecret))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Typography color="textPrimary" gutterBottom variant="h6">
        Payment Checkout
      </Typography>
      <Divider />

      {auth?.user?.premiumSubscribed === false ? (
        <div className="premiumBox">
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeForm />
            </Elements>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ProfileInfo;
