import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

function PaymentStatus() {
  const { payment_intent, redirect_status } = useParams();
  const [paymentStatus, setPaymentStatus] = useState(redirect_status);

  const apiBaseUrl = import.meta.env.VITE_NODE_API_URL;

  useEffect(() => {
    const retrievePaymentStatus = async () => {
      try {
        const response = await axios.post(
          `${apiBaseUrl}/retrieve-payment-status`,
          {
            payment_intent,
          },
        );
        setPaymentStatus(response.data.status);
      } catch (error) {
        console.error(error);
      }
    };
    retrievePaymentStatus();
  }, [payment_intent]);

  return (
    <div>
      {paymentStatus ? (
        <p>Payment Status: {paymentStatus}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PaymentStatus;
