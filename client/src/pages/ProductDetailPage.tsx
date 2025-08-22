import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Chip,
  Rating,
  TextField,
  Divider,
  Paper,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Add as AddIcon, ShoppingCart as CartIcon } from '@mui/icons-material';
import { allProducts } from '../data/products';
import ImageLoader from '../components/ImageLoader';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState<number | null>(5);

  // Отримуємо товар з даних
  const productData = allProducts.find(p => p.id === parseInt(id || '1'));
  
  // Якщо товар не знайдено, показуємо заглушку
  if (!productData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Товар не знайдено
        </Typography>
        <Button variant="contained" onClick={() => navigate('/products')}>
          Повернутися до товарів
        </Button>
      </Box>
    );
  }

  // Розширюємо дані товару для детальної сторінки
  const product = {
    ...productData,
    description: `${productData.title} - високоякісний товар від ${productData.seller}. Ідеальний вибір для ваших потреб.`,
    images: [
      productData.image,
      productData.image, // Дублюємо для демонстрації
      productData.image,
    ],
    brand: productData.seller.split(' ')[0],
    model: productData.title,
    stockQuantity: Math.floor(Math.random() * 20) + 5,
    specifications: {
      'Бренд': productData.seller.split(' ')[0],
      'Категорія': productData.category,
      'Продавець': productData.seller,
      'Рейтинг': `${productData.rating}/5`,
      'Відгуки': `${productData.reviews} шт.`,
      'Знижка': `${productData.discount}%`,
    },
    reviews: [
      {
        id: 1,
        user: 'Іван П.',
        rating: 5,
        comment: 'Відмінний товар! Якість на висоті, рекомендую.',
        date: '2024-01-15',
      },
      {
        id: 2,
        user: 'Марія К.',
        rating: 4,
        comment: 'Дуже задоволена покупкою. Єдиний мінус - висока ціна.',
        date: '2024-01-10',
      },
    ],
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddToCart = () => {
    // Add to cart functionality will be implemented here
  };

  const handleBuyNow = () => {
    // Buy now functionality will be implemented here
  };

  const handleSubmitReview = () => {
    // Review submission will be implemented here
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Card>
            <ImageLoader
              src={product.images[0]}
              alt={product.title}
              height={400}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
          
          {/* Thumbnail images */}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            {product.images.map((image, index) => (
              <Card key={index} sx={{ cursor: 'pointer' }}>
                <ImageLoader
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  height={80}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {`${product.rating} (${product.reviews} відгуків)`}
            </Typography>
          </Box>

          <Chip label={product.category} sx={{ mb: 2 }} />
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {product.price.toLocaleString()} ₴
            </Typography>
            {product.originalPrice && (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {product.originalPrice.toLocaleString()} ₴
              </Typography>
            )}
            {product.discount && (
              <Chip
                label={`-${product.discount}%`}
                color="success"
                sx={{ ml: 1 }}
              />
            )}
          </Box>

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Бренд: {product.brand}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Модель: {product.model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              В наявності: {product.stockQuantity} шт.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TextField
              type="number"
              label="Кількість"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1, max: product.stockQuantity }}
              sx={{ width: 100 }}
            />
            <Button
              variant="contained"
              startIcon={<CartIcon />}
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
              sx={{ flexGrow: 1 }}
            >
              Додати в кошик
            </Button>
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleBuyNow}
            disabled={product.stockQuantity === 0}
            sx={{ mb: 2 }}
          >
            Купити зараз
          </Button>

          {product.stockQuantity === 0 && (
            <Typography variant="body2" color="error" align="center">
              Товар відсутній на складі
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Paper>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Опис" />
            <Tab label="Характеристики" />
            <Tab label="Відгуки" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="body1">
              iPhone 15 Pro представляє нову еру мобільних технологій. З революційним A17 Pro чипом, 
              титановим дизайном та найкращою в історії iPhone камерою, цей пристрій встановлює нові стандарти 
              для смартфонів.
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {key}:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Додати відгук
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Rating
                  value={reviewRating}
                  onChange={(event, newValue) => setReviewRating(newValue)}
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Ваш відгук"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleSubmitReview}
                disabled={!reviewText.trim() || !reviewRating}
              >
                Відправити відгук
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Всі відгуки ({product.reviews.length})
            </Typography>

            <List>
              {product.reviews.map((review) => (
                <ListItem key={review.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{review.user[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2">
                          {review.user}
                        </Typography>
                        <Rating value={review.rating} size="small" readOnly />
                        <Typography variant="caption" color="text.secondary">
                          {review.date}
                        </Typography>
                      </Box>
                    }
                    secondary={review.comment}
                  />
                </ListItem>
              ))}
            </List>
          </TabPanel>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductDetailPage; 