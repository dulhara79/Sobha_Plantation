import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Button, Typography, Box, TextField, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Import your product images
import product_1 from '../assets/Buyer/product_1.jpg';
import product_2 from '../assets/Buyer/product_2.jpg';
import product_3 from '../assets/Buyer/product_3.jpg';
import product_4 from '../assets/Buyer/product_4.jpg';
import product_5 from '../assets/Buyer/product_5.jpg';
import product_6 from '../assets/Buyer/product_6.jpg';
import crop_1 from '../assets/Buyer/crop_1.jpeg';
import crop_2 from '../assets/Buyer/crop_2.jpeg';
import crop_3 from '../assets/Buyer/crop_3.jpg';
import crop_4 from '../assets/Buyer/crop_4.jpg';
import crop_5 from '../assets/Buyer/crop_5.jpg';

// Product details array with prices
const products = [
  { name: 'COCONUT (1 unit)', img: crop_1, description: '110.00 LKR', price: 110 },
  { name: 'BANANA 1kg (Kolikuttu)', img: crop_2, description: '300.00 LKR', price: 300 },
  { name: 'PINEAPPLE 1kg', img: crop_3, description: '690.00 LKR', price: 690 },
  { name: 'PAPAYA', img: crop_4, description: '200.00 LKR', price: 200 },
  { name: 'Crop 5', img: crop_5, description: '250.00 LKR', price: 250 },
  { name: 'Product 1', img: product_1, description: 'Description of product 1', price: 350 },
  { name: 'Product 2', img: product_2, description: 'Description of product 2', price: 400 },
  { name: 'Product 3', img: product_3, description: 'Description of product 3', price: 450 },
  { name: 'Product 4', img: product_4, description: 'Description of product 4', price: 500 },
  { name: 'Product 5', img: product_5, description: 'Description of product 5', price: 550 },
  { name: 'Product 6', img: product_6, description: 'Description of product 6', price: 600 },
];

const HomePage = () => {
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleQuantityChange = (productName, value) => {
    const numericValue = value.replace(/\D/g, '');

    if (numericValue > 250) {
      setError({ [productName]: 'You have reached the maximum quantity.' });
    } else {
      setError({});
    }

    setQuantities({
      ...quantities,
      [productName]: numericValue ? parseInt(numericValue, 10) : 0,
    });
  };

  const incrementQuantity = (productName) => {
    const currentQuantity = quantities[productName] || 0;
    if (currentQuantity < 250) {
      handleQuantityChange(productName, (currentQuantity + 1).toString());
    }
  };

  const decrementQuantity = (productName) => {
    const currentQuantity = quantities[productName] || 0;
    if (currentQuantity > 0) {
      handleQuantityChange(productName, (currentQuantity - 1).toString());
    }
  };

  const calculateOverallTotal = () => {
    return products.reduce((sum, product) => {
      return sum + product.price * (quantities[product.name] || 0);
    }, 0);
  };

  const handleBuyNow = () => {
    const totalAmount = calculateOverallTotal();
    navigate('/payment', { state: { totalAmount, quantities } });
  };

  const handleAddToCart = (product) => {
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${product.name} has been added to your cart successfully!`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleCartClick = () => {
    const totalAmount = calculateOverallTotal();
    navigate('/cart', { state: { quantities, totalAmount } });
  };

  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        border: '1px solid #ddd',
      }}
    >
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" component="h1">
          Our Products
        </Typography>
        <IconButton onClick={handleCartClick} sx={{ backgroundColor: '#ffeb3b' }}>
          <ShoppingCartIcon />
        </IconButton>
      </Box>

      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.img}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {product.description}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                >
                  <IconButton onClick={() => decrementQuantity(product.name)}>
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    type="text"
                    value={quantities[product.name] || ''}
                    onChange={(e) =>
                      handleQuantityChange(product.name, e.target.value)
                    }
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    sx={{ width: '190px', textAlign: 'center' }}
                    placeholder="Enter Quantity"
                    error={!!error[product.name]}
                    helperText={error[product.name] || ''}
                  />
                  <IconButton onClick={() => incrementQuantity(product.name)}>
                    <AddIcon />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: 'yellow', color: 'black' }}
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: 'green', color: 'white' }}
                    startIcon={<ShoppingCartCheckoutIcon />}
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
