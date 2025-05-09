import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import axios from '../utils/axios-config';
import { useAuth } from '../hooks/AuthProvider';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const apiBaseUrl =
  import.meta.env.VITE_NODE_API_URL || import.meta.env.VITE_NODE_API_URL_LOCAL;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const auth = useAuth();
  const navigate = useNavigate();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log(
        'Payment successful!',
        paymentIntent,
        auth?.user?.id,
        typeof auth?.user?.id,
      );
      const apiBaseUrl =
        import.meta.env.VITE_NODE_API_URL ||
        import.meta.env.VITE_NODE_API_URL_LOCAL;

      const response = await axios.post(`${apiBaseUrl}/api/payments/create`, {
        stripePaymentId: paymentIntent.id,
        userId: auth?.user?.id,
        amount: paymentIntent.amount / 100,
        status: paymentIntent.status,
      });

      const { status } = response.data;
      if (status === 201) {
        console.log('Payment record added.');
      }

      const responseUserPremium = await axios.put(
        `${apiBaseUrl}/api/users/subscribe/${auth?.user?.id}`,
      );

      console.log('Subscription updated:', responseUserPremium.data);

      const putStatus = responseUserPremium.data.status;
      if (putStatus === 200) {
        console.log('User premium subscription field updated.');
      }

      if (status === 201 && putStatus === 200) {
        navigate('/paymentSuccess');
      } else {
        navigate('/paymentFail');
      }
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <PaymentElement />
      <Button
        sx={{ margin: '30px 0', width: '100%' }}
        variant="contained"
        color="success"
        size="large"
        type="submit"
        disabled={!stripe}
        endIcon={<WorkspacePremiumIcon />}
      >
        <b>Pay $10&nbsp;</b> for life-time premium subscription
      </Button>
    </form>
  );
};

const CheckoutStripe = () => {
  const auth = useAuth();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create a PaymentIntent on the server-side
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

  if (!clientSecret) return <p>Loading...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm />
    </Elements>
  );
};

export default CheckoutStripe;
