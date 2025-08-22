import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Divider,
  Paper,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'iPhone 15 Pro 256GB',
      price: 45999,
      originalPrice: 49999,
      image: '/images/products/iphone-15-pro.jpg',
      quantity: 1,
      seller: 'Apple Store',
    },
    {
      id: 2,
      title: 'Samsung Galaxy S24 Ultra',
      price: 32999,
      originalPrice: 36999,
      image: '/images/products/samsung-galaxy-s24.jpg',
      quantity: 2,
      seller: 'Samsung Shop',
    },
  ]);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 1000 ? 0 : 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleCheckout = () => {
    // Checkout functionality will be implemented here
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" gutterBottom>
          Ваш кошик порожній
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Додайте товари до кошика, щоб зробити замовлення
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/products')}
        >
          Переглянути товари
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Кошик
      </Typography>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3} sm={2}>
                    <CardMedia
                      component="img"
                      height="100"
                      image={item.image}
                      alt={item.title}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Grid>
                  
                  <Grid item xs={9} sm={6}>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {item.price.toLocaleString()} ₴
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      
                      <TextField
                        size="small"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1;
                          updateQuantity(item.id, value);
                        }}
                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                        sx={{ width: 60 }}
                      />
                      
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" fontWeight="bold">
                        {(item.price * item.quantity).toLocaleString()} ₴
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={() => removeItem(item.id)}
                        sx={{ mt: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Підсумок замовлення
            </Typography>
            
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Товари ({cartItems.length})</Typography>
                <Typography>{calculateSubtotal().toLocaleString()} ₴</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Доставка</Typography>
                <Typography>
                  {calculateShipping() === 0 ? 'Безкоштовно' : `${calculateShipping()} ₴`}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">
                  Всього
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {calculateTotal().toLocaleString()} ₴
                </Typography>
              </Box>
            </Box>

            {calculateSubtotal() < 1000 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Додайте товарів ще на {(1000 - calculateSubtotal()).toLocaleString()} ₴ для безкоштовної доставки
              </Alert>
            )}

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Оформити замовлення
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage; 