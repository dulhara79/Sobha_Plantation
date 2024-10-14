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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Fullscreen height
        backgroundColor: '#f1f8e9', // Soft green background
      }}
    >
      <Box
        sx={{
          padding: '40px',
          maxWidth: '900px',
          width: '100%',
          background: 'linear-gradient(135deg, #e8f5e9, #ffffff)',
          borderRadius: '20px',
          border: '1px solid #a5d6a7',
          boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center', // Center the text inside the box
          animation: 'fadeIn 0.5s ease-out',
        }}
      >
        {/* Green Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '-30px',
            right: '-50px',
            width: '220px',
            height: '220px',
            backgroundColor: 'rgba(76, 175, 80, 0.3)',
            borderRadius: '50%',
            zIndex: -1,
            filter: 'blur(80px)',
            animation: 'pulse 3s infinite ease-in-out',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '270px',
            height: '270px',
            backgroundColor: 'rgba(56, 142, 60, 0.3)',
            borderRadius: '50%',
            zIndex: -1,
            filter: 'blur(100px)',
            animation: 'pulse 3s infinite ease-in-out',
          }}
        />

        {/* Cart Summary Title */}
        <Typography
          variant="h2"
          component="h1"
          mb={4}
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #4caf50, #388e3c)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            animation: 'slideInFromTop 0.7s ease-out',
          }}
        >
          Cart Summary
        </Typography>

        {/* Cart Items with Hover Effect */}
        <List sx={{ marginBottom: '30px' }}>
          {Object.keys(quantities).map((productName, index) => (
            <ListItem
              key={index}
              sx={{
                padding: '12px 0',
                borderBottom: '1px solid #e0e0e0',
                '&:last-child': {
                  borderBottom: 'none',
                },
                '&:hover': {
                  backgroundColor: '#e8f5e9',
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.2rem',
                  color: '#388e3c',
                  fontWeight: '500',
                  animation: 'fadeInUp 1s ease-out',
                }}
              >
                {productName}: <strong>{quantities[productName]}</strong>
              </Typography>
            </ListItem>
          ))}
        </List>

        {/* Total Amount */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#2e7d32',
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '1.8rem',
            letterSpacing: '1.5px',
            animation: 'fadeInUp 1s ease-out 0.3s',
          }}
        >
          Total Amount: LKR {totalAmount}
        </Typography>

        {/* Checkout Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/payment', { state: { totalAmount, quantities } })}
          sx={{
            padding: '15px',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #66bb6a, #43a047)',
            boxShadow: '0px 8px 20px rgba(76, 175, 80, 0.4)',
            borderRadius: '10px',
            '&:hover': {
              background: 'linear-gradient(135deg, #43a047, #2e7d32)',
              boxShadow: '0px 12px 24px rgba(56, 142, 60, 0.6)',
              transform: 'translateY(-4px)',
              transition: 'all 0.3s ease-in-out',
            },
            animation: 'bounceIn 0.5s ease-out 0.5s',
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
