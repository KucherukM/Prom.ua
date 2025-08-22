import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Chip,
  Slider,
  FormControlLabel,
  Checkbox,
  Paper,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { allProducts, getProductsByCategory, searchProducts } from '../data/products';
import ImageLoader from '../components/ImageLoader';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);

  // Отримуємо категорію з URL параметрів
  const categoryFromUrl = searchParams.get('category');
  
  // Отримуємо товари залежно від категорії
  const products = categoryFromUrl 
    ? getProductsByCategory(categoryFromUrl)
    : allProducts;

  const categories = [
    'Техніка та електроніка',
    'Одяг та взуття',
    'Побутова техніка',
    'Спорт та відпочинок',
    'Краса та здоров\'я',
    'Дім та сад',
    'Товари для дітей',
    'Авто - мото',
  ];

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesPrice && matchesCategory;
  });

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Товари
      </Typography>

      <Grid container spacing={3}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Фільтри
            </Typography>

            {/* Price Range */}
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Ціна (₴)</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
                step={1000}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  label="Від"
                />
                <TextField
                  size="small"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  label="До"
                />
              </Box>
            </Box>

            {/* Categories */}
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Категорії</Typography>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                  }
                  label={category}
                />
              ))}
            </Box>

            {/* Sort */}
            <Box>
              <FormControl fullWidth size="small">
                <InputLabel>Сортування</InputLabel>
                <Select
                  value={sortBy}
                  label="Сортування"
                  onChange={handleSortChange}
                >
                  <MenuItem value="name">За назвою</MenuItem>
                  <MenuItem value="price_asc">Ціна (від дешевих)</MenuItem>
                  <MenuItem value="price_desc">Ціна (від дорогих)</MenuItem>
                  <MenuItem value="rating">За рейтингом</MenuItem>
                  <MenuItem value="newest">Новіші</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} lg={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <ImageLoader
                    src={product.image}
                    alt={product.title}
                    height={200}
                    sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {product.title}
                    </Typography>
                    
                    <Chip 
                      label={product.category} 
                      size="small" 
                      sx={{ mb: 1 }}
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        {product.price.toLocaleString()} ₴
                      </Typography>
                      {product.originalPrice && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          {product.originalPrice.toLocaleString()} ₴
                        </Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        ⭐ {product.rating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ({product.reviews} відгуків)
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={10}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsPage; 