import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const PaymentFailure = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <ErrorOutlineIcon sx={{ fontSize: 60, color: 'red' }} />
      <Typography variant="h4" sx={{ mt: 2 }}>
        Payment Failed
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Sorry, your payment could not be processed. Please try again or contact
        support.
      </Typography>
    </Box>
  );
};

export default PaymentFailure;
