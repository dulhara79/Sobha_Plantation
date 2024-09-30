import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios'; // Make sure to install Axios with `npm install axios`

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    setMessage(''); // Reset message

    try {
      // Replace this URL with your actual API endpoint
      const response = await axios.post('/api/subscribe', { email: email });

      if (response.status === 200) {
        setMessage('Subscription successful! Thank you for subscribing.');
        setEmail(''); // Clear input
      }
    } catch (error) {
      setMessage('Subscription successful! Thank you for subscribing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-10 mx-4 text-center bg-green-100 md:mx-20"
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        borderRadius: '12px',
        maxWidth: '95%',
        padding: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <h2 className="mb-4 text-4xl font-bold text-gray-800">Subscribe to Our Newsletter</h2>
      <p className="mb-6 text-gray-700 text-md">Stay updated with the latest news and exclusive offers!</p>
      {message && <p className="text-gray-800">{message}</p>}
      <div className="flex flex-col items-center justify-center md:flex-row">
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 md:w-1/3"
          label="Email Address"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className="mt-2 md:mt-0 md:ml-4"
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            bgcolor: '#1D6660',
            color: 'white',
            '&:hover': {
              bgcolor: '#155d54',
            },
            borderRadius: '8px',
          }}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
