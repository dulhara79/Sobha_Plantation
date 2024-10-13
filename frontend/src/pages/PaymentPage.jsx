import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, TextField, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount = 0, quantities = {} } = location.state || {}; // Destructure safely

  const [open, setOpen] = useState(false);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Payments Gateway
      </Typography>
      <Typography variant="h5">Total Amount: LKR {totalAmount}</Typography>
      <Typography variant="h5">Products Selected:</Typography>
      <ul>
        {Object.entries(quantities).length > 0 ? ( // Check if quantities is not empty
          Object.entries(quantities).map(([product, quantity]) => (
            <li key={product}>
              {product}: {quantity} 
            </li>
          ))
        ) : (
          <li>No products selected</li> // Handle the case where no products are selected
        )}
      </ul>
      <form onSubmit={handlePaymentSubmit}>
      <TextField label="Card Holder Name" fullWidth required />
        <TextField label="Card Number" fullWidth required />
        <TextField label="Expiry Date" fullWidth required />
        <TextField label="CVV" fullWidth required />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
          Pay Now
        </Button>
      </form>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your payment has been processed successfully. Thank you for your purchase!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentPage;
