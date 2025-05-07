import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import axios from '../utils/axios-config';
import { useAuth } from '../hooks/AuthProvider';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const apiBaseUrl = import.meta.env.VITE_NODE_API_URL;

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

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
      console.log('Payment successful!');
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

function CheckoutStripe() {
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
}

export default CheckoutStripe;
