import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const PaymentSuccess = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green' }} />
      <Typography variant="h4" sx={{ mt: 2 }}>
        Payment Successful!
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Your payment has been processed successfully. Thank you for your order!
      </Typography>
    </Box>
  );
};

export default PaymentSuccess;
