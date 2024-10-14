import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Paper, Button, List, ListItem, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const MyOrders = () => {
  const location = useLocation();
  const { totalAmount = 0, quantities = {} } = location.state || {};

  return (
    <Paper
      sx={{
        maxWidth: 600,
        margin: '40px auto',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box textAlign="center">
        <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
        <Typography variant="h4" sx={{ marginTop: '20px', marginBottom: '20px' }}>
          Order Confirmed!
        </Typography>
        <Typography variant="h6">
          Thank you for your purchase. Your order has been successfully placed.
        </Typography>
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6">Order Summary:</Typography>
        <List>
          {Object.entries(quantities).length > 0 ? (
            Object.entries(quantities).map(([product, quantity]) => (
              <ListItem key={product}>
                <ListItemText
                  primary={`${product} - Quantity: ${quantity}`}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No products selected." />
            </ListItem>
          )}
        </List>
      </Box>

      <Typography variant="h5" sx={{ marginTop: '20px' }}>
        Total Amount Paid: LKR {totalAmount}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '30px' }}
        onClick={() => {
          // Redirect to homepage or product page
          window.location.href = '/HomePage';
        }}
      >
        Back to Home
      </Button>
    </Paper>
  );
};

export default MyOrders;
