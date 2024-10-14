import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Button, TextField, Box, Typography, MenuItem, Select,
  FormControl, InputLabel, Grid, InputAdornment, IconButton, Paper
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LockIcon from '@mui/icons-material/Lock';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount = 0, quantities = {} } = location.state || {};

  const [form, setForm] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const restrictInputToLettersAndSpace = (e) => {
    if (!/[a-zA-Z ]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const preventNonAlphabetPaste = (e) => {
    const clipboardData = e.clipboardData.getData('Text');
    if (!/^[a-zA-Z ]*$/.test(clipboardData)) {
      e.preventDefault();
    }
  };

  const restrictInputToNumbers = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const preventNonNumericPaste = (e) => {
    const clipboardData = e.clipboardData.getData('Text');
    if (!/^[0-9]*$/.test(clipboardData)) {
      e.preventDefault();
    }
  };

  const validate = () => {
    const newErrors = {};
    const cardHolderNameRegex = /^[A-Za-z ]{2,50}$/;
    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardHolderNameRegex.test(form.cardHolderName)) {
      newErrors.cardHolderName = 'Invalid name. Only letters and spaces are allowed.';
    }

    if (!cardNumberRegex.test(form.cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits.';
    }

    if (!form.expiryMonth || !form.expiryYear) {
      newErrors.expiryDate = 'Select both month and year.';
    } else {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      if (
        form.expiryYear < currentYear ||
        (form.expiryYear === currentYear && form.expiryMonth < currentMonth)
      ) {
        newErrors.expiryDate = 'Expiry date cannot be in the past.';
      }
    }

    if (!cvvRegex.test(form.cvv)) {
      newErrors.cvv = 'CVV must be exactly 3 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your payment has been processed successfully!',
        showConfirmButton: false,
        timer: 3000,  // Auto-dismiss after 3 seconds
      });

      // Redirect to HomePage after 3 seconds
      setTimeout(() => {
        navigate('/HomePage');
      }, 3000);
    } else {
      Swal.fire('Error', 'Please correct the errors in the form.', 'error');
    }
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear + i);
  };

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
      <Typography variant="h3" align="center" gutterBottom>
        Payments Gateway
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        Total Amount: LKR {totalAmount}
      </Typography>
      <Typography variant="h6">Products Selected:</Typography>
      <ul>
        {Object.entries(quantities).length > 0 ? (
          Object.entries(quantities).map(([product, quantity]) => (
            <li key={product}>
              {product}: {quantity}
            </li>
          ))
        ) : (
          <li>No products selected</li>
        )}
      </ul>
      <form onSubmit={handlePaymentSubmit}>
        <TextField
          label="Card Holder Name"
          name="cardHolderName"
          value={form.cardHolderName}
          onChange={handleChange}
          error={!!errors.cardHolderName}
          helperText={errors.cardHolderName}
          fullWidth
          required
          margin="normal"
          onKeyPress={restrictInputToLettersAndSpace}
          onPaste={preventNonAlphabetPaste}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Card Number"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber}
          fullWidth
          required
          margin="normal"
          inputProps={{ maxLength: 16 }}
          onKeyPress={restrictInputToNumbers}
          onPaste={preventNonNumericPaste}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreditCardIcon />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Expiry Month</InputLabel>
              <Select
                name="expiryMonth"
                value={form.expiryMonth}
                onChange={handleChange}
                error={!!errors.expiryDate}
              >
                {[...Array(12).keys()].map((month) => (
                  <MenuItem key={month + 1} value={month + 1}>
                    {month + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Expiry Year</InputLabel>
              <Select
                name="expiryYear"
                value={form.expiryYear}
                onChange={handleChange}
                error={!!errors.expiryDate}
              >
                {generateYears().map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {errors.expiryDate && (
          <Typography color="error" variant="body2">
            {errors.expiryDate}
          </Typography>
        )}

        <TextField
          label="CVV"
          name="cvv"
          value={form.cvv}
          onChange={handleChange}
          error={!!errors.cvv}
          helperText={errors.cvv}
          fullWidth
          required
          margin="normal"
          inputProps={{ maxLength: 3 }}
          onKeyPress={restrictInputToNumbers}
          onPaste={preventNonNumericPaste}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '20px' }}
        >
          Pay Now
        </Button>
      </form>
    </Paper>
  );
};

export default PaymentPage;
