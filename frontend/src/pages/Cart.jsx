import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quantities = {}, totalAmount = 0 } = location.state || {};

  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        border: '1px solid #ddd',
      }}
    >
      <Typography variant="h4" component="h1" mb={4}>
        Cart Summary
      </Typography>

      <List>
        {Object.keys(quantities).map((productName, index) => (
          <ListItem key={index}>
            <Typography variant="body1">
              {productName}: {quantities[productName]}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" mt={4}>
        Total Amount: LKR {totalAmount}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/payment', { state: { totalAmount, quantities } })}
        sx={{ marginTop: '20px' }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default CartPage;
