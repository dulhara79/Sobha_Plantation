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
        maxWidth: 650,
        margin: '50px auto',
        padding: '40px',
        borderRadius: '16px',
        background: 'linear-gradient(145deg, #e0ffe6, #f2fff7)',
        boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.15)',
      }}
    >
      {/* Confirmation Section */}
      <Box textAlign="center">
        <CheckCircleIcon color="success" sx={{ fontSize: 80 }} /> {/* Increased icon size */}
        <Typography variant="h3" sx={{ marginTop: '20px', fontWeight: 'bold', color: '#2e7d32' }}>
          Order Confirmed! {/* Larger font and bolder text */}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: '10px', color: '#555' }}>
          Thank you for your purchase. Your order has been successfully placed.
        </Typography>
      </Box>

      {/* Order Summary Section */}
      <Box sx={{ marginTop: '30px' }}>
        <Typography variant="h5" sx={{ fontWeight: '600', color: '#333' }}>
          Order Summary:
        </Typography>
        <List>
          {Object.entries(quantities).length > 0 ? (
            Object.entries(quantities).map(([product, quantity]) => (
              <ListItem key={product}>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle1', color: '#444' }}
                  primary={`${product} - Quantity: ${quantity}`}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No products selected." primaryTypographyProps={{ variant: 'subtitle1', color: '#777' }} />
            </ListItem>
          )}
        </List>
      </Box>

      {/* Total Amount Paid */}
      <Typography variant="h4" sx={{ marginTop: '30px', fontWeight: '600', color: '#1b5e20' }}>
        Total Amount Paid: LKR {totalAmount}
      </Typography>

      {/* Back to Home Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          marginTop: '40px',
          padding: '12px 0',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          background: 'linear-gradient(145deg, #42a5f5, #1e88e5)',
          boxShadow: '0px 4px 12px rgba(33, 150, 243, 0.3)',
          '&:hover': {
            background: 'linear-gradient(145deg, #1e88e5, #1976d2)',
          },
        }}
        onClick={() => {
          window.location.href = '/HomePage';
        }}
      >
        Back to Home
      </Button>
    </Paper>
  );
};

export default MyOrders;
