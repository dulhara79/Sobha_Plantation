// src/components/LearnMore.jsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const LearnMore = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '40px', padding: '20px' }}>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: 3, // This adds a nice shadow effect
          padding: '30px', // Adds padding inside the box
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#1D6660', 
            textAlign: 'center', 
            marginBottom: '20px' 
          }}
        >
          Learn More About Sobha Plantations
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            lineHeight: '1.6', 
            textAlign: 'justify', 
            marginBottom: '20px' 
          }}
        >
          Sobha Plantations is committed to delivering high-quality coconut products while ensuring sustainability in our cultivation processes. Our plantations are located in Kurunegala, where we employ best practices to maintain soil health, promote biodiversity, and support local communities.
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            lineHeight: '1.6', 
            textAlign: 'justify', 
            marginBottom: '20px' 
          }}
        >
          We pride ourselves on transparency and provide real-time updates on our production processes, allowing you to track the journey of our products from farm to table.
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            lineHeight: '1.6', 
            textAlign: 'justify', 
            marginBottom: '20px' 
          }}
        >
          Join us in our mission to cultivate premium coconut products that contribute to a sustainable future. Explore our range of products and discover how Sobha Plantations can be your trusted partner in coconut cultivation.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          sx={{
            borderColor: '#1D6660',
            color: '#1D6660',
            marginTop: '20px',
            padding: '10px 20px',
            '&:hover': {
              color: '#1D6660',
            },
          }}
        >
          Back to Home
        </Button>
      </Box>
      
    </Container>
    
  );
};

export default LearnMore;
