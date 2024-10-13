import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Button, TextField, Box, Typography, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, MenuItem, 
  Select, FormControl, InputLabel, Grid
} from '@mui/material';

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount = 0, quantities = {} } = location.state || {};

  const [form, setForm] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Allow only letters and spaces for the name field
  const restrictInputToLettersAndSpace = (e) => {
    if (!/[a-zA-Z ]/.test(e.key)) {
      e.preventDefault(); // Block anything other than letters and spaces
    }
  };

  const preventNonAlphabetPaste = (e) => {
    const clipboardData = e.clipboardData.getData('Text');
    if (!/^[a-zA-Z ]*$/.test(clipboardData)) {
      e.preventDefault(); // Prevent pasting non-alphabetic characters
    }
  };

  const restrictInputToNumbers = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault(); // Prevent non-numeric input
    }
  };

  const preventNonNumericPaste = (e) => {
    const clipboardData = e.clipboardData.getData('Text');
    if (!/^[0-9]*$/.test(clipboardData)) {
      e.preventDefault(); // Prevent non-numeric paste
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
      setOpen(true);
    } else {
      Swal.fire('Error', 'Please correct the errors in the form.', 'error');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear + i);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Payments Gateway
      </Typography>
      <Typography variant="h5">Total Amount: LKR {totalAmount}</Typography>
      <Typography variant="h5">Products Selected:</Typography>
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
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px' }}
        >
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
