import React from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { Button } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

function StripeForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/paymentStatus',
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        variant="contained"
        color="success"
        size="large"
        type="submit"
        disabled={!stripe}
        endIcon={<WorkspacePremiumIcon />}
        style={{ width: '100%', margin: '50px 0' }}
      >
        <b>Pay $10 &nbsp; </b> for Life time membership
      </Button>
    </form>
  );
}

export default StripeForm;
