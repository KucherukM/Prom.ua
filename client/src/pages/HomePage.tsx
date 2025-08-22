import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Avatar,
  Chip,
  Paper,
  Rating,
  Stack,
  Divider,
  alpha,
  styled,
  keyframes,
} from '@mui/material';
import {
  Spa,
  Home,
  Category,
  Phone,
  ChildCare,
  DirectionsCar,
  Book,
  Diamond,
  Build,
  SportsSoccer,
  LocalHospital,
  Pets,
  Favorite,
  School,
  Work,
  Celebration,
  LocalDining,
  Security,
  Handyman,
  Collections,
  Construction,
  Business,
  Support,
  Bolt,
  Star as StarIcon,
  ShoppingCart,
  Favorite as FavoriteIcon,
  TrendingUp,
  LocalOffer,
  School as SchoolIcon,
  Payment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getProductImage, getCategoryImage, getBannerImage } from '../data/images';
import { allProducts } from '../data/products';
import ImageLoader from '../components/ImageLoader';

// Анімації
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Стилізовані компоненти
const BannerCard = styled(Card)(({ theme }) => ({
  height: 200,
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
    zIndex: 1,
  },
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  height: 120,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  border: '1px solid rgba(0,0,0,0.05)',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid rgba(0,0,0,0.05)',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
  },
}));

const AnimatedBox = styled(Box)(({ theme }) => ({
  animation: `${fadeInUp} 0.6s ease-out`,
}));

const PulseButton = styled(Button)(({ theme }) => ({
  animation: `${pulse} 2s infinite`,
  '&:hover': {
    animation: 'none',
  },
}));

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Краса та здоров\'я', icon: <Spa />, color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' },
    { name: 'Дім та сад', icon: <Home />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' },
    { name: 'Одяг та взуття', icon: <Category />, color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' },
    { name: 'Техніка та електроніка', icon: <Phone />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' },
    { name: 'Товари для дітей', icon: <ChildCare />, color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' },
    { name: 'Авто - мото', icon: <DirectionsCar />, color: '#6b7280', gradient: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)' },
    { name: 'Подарунки, хобі, книги', icon: <Book />, color: '#a16207', gradient: 'linear-gradient(135deg, #a16207 0%, #ca8a04 100%)' },
    { name: 'Аксесуари та прикраси', icon: <Diamond />, color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)' },
    { name: 'Матеріали для ремонту', icon: <Build />, color: '#84cc16', gradient: 'linear-gradient(135deg, #84cc16 0%, #a3e635 100%)' },
    { name: 'Спорт та відпочинок', icon: <SportsSoccer />, color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)' },
    { name: 'Медикаменти та медичні товари', icon: <LocalHospital />, color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' },
    { name: 'Зоотовари', icon: <Pets />, color: '#a16207', gradient: 'linear-gradient(135deg, #a16207 0%, #ca8a04 100%)' },
    { name: 'Інтимні товари', icon: <Favorite />, color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)' },
    { name: 'Канцтовари', icon: <School />, color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' },
    { name: 'Спецодяг та взуття', icon: <Work />, color: '#6b7280', gradient: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)' },
    { name: 'Весільні товари', icon: <Celebration />, color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' },
    { name: 'Продукти харчування, напої', icon: <LocalDining />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' },
    { name: 'Воєнторг', icon: <Security />, color: '#a16207', gradient: 'linear-gradient(135deg, #a16207 0%, #ca8a04 100%)' },
    { name: 'Інструмент', icon: <Handyman />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' },
    { name: 'Антикваріат та колекціонування', icon: <Collections />, color: '#84cc16', gradient: 'linear-gradient(135deg, #84cc16 0%, #a3e635 100%)' },
    { name: 'Будівництво', icon: <Construction />, color: '#6b7280', gradient: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)' },
    { name: 'Товари для бізнесу', icon: <Business />, color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' },
    { name: 'Послуги', icon: <Support />, color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)' },
    { name: 'Енергопостачальні прилади', icon: <Bolt />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' },
  ];

  const banners = [
    {
      title: 'Знижки до школи',
      subtitle: 'До -50% на канцтовари',
      color: '#10b981',
      icon: <SchoolIcon />,
      image: getBannerImage('Знижки до школи'),
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
    },
    {
      title: 'Користуйся вже, а сплачуй частинами',
      subtitle: 'Без переплат',
      color: '#3b82f6',
      icon: <Payment />,
      image: getBannerImage('Користуйся вже, а сплачуй частинами'),
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
    },
    {
      title: 'Вишиванки зі знижками',
      subtitle: 'До -30% на національний одяг',
      color: '#ec4899',
      icon: <Celebration />,
      image: getBannerImage('Вишиванки зі знижками'),
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
    },
  ];

  const popularSearches = [
    'Чехол на samsung a55', 'Чехол на самсунг а35', 'Чехол Motorola G24 Power',
    'Чехол на телефон Tecno Spark Go 2024', 'Женский спортивный костюм для спорт зала',
    'Мужские кроссовки кожаные натуральные демисезон', 'Nike Air Max Tn Plus Drift',
    'Бутсы Nike AIR Zoom Mercurial Vapor 16', 'Nike спортивный костюм с кепкой и штанами',
    'Мужский набор трусов', 'Мужский подарунок', 'Демисезонные женские демисезонные куртки',
    'Мужская куртка демисезонняя', 'Куртка женская демисезонная Markush M124',
    'Игрушка для кота летающая птичка', 'Корм диета для собаки royal canin gastrointestinal',
    'First choice корм для стерилизованных кошек', 'Питательный корм для щенков крупных пород',
    'Подарок для девушкиподарок для женщины', 'Dolce Gabbana Кроссовки Dolce Gabbana Space White'
  ];

  const featuredProducts = allProducts.slice(0, 12);

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section */}
        <AnimatedBox sx={{ mb: 6 }}>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              color: 'white',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.3,
              }
            }}
          >
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Ласкаво просимо на Prom.ua
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Найкращі товари за найкращими цінами
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <PulseButton
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={() => navigate('/products')}
                sx={{
                  bgcolor: 'white',
                  color: '#2563eb',
                  '&:hover': { bgcolor: '#f8fafc' }
                }}
              >
                Переглянути товари
              </PulseButton>
              <Button
                variant="outlined"
                size="large"
                startIcon={<TrendingUp />}
                onClick={() => navigate('/products')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Популярні товари
              </Button>
            </Stack>
          </Paper>
        </AnimatedBox>

        {/* Banners */}
        <AnimatedBox sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            {banners.map((banner, index) => (
              <Grid item xs={12} md={4} key={index}>
                <BannerCard
                  onClick={() => navigate('/products')}
                  sx={{
                    background: banner.gradient,
                    backgroundImage: `url(${banner.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay',
                  }}
                >
                  <CardContent sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                    color: 'white'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                        {banner.icon}
                      </Avatar>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        {banner.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      {banner.subtitle}
                    </Typography>
                  </CardContent>
                </BannerCard>
              </Grid>
            ))}
          </Grid>
        </AnimatedBox>

        {/* Categories Grid */}
        <AnimatedBox sx={{ mb: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
              Каталог товарів
            </Typography>
            <Grid container spacing={2}>
              {categories.map((category, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                  <CategoryCard onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        mb: 1,
                        background: category.gradient,
                        color: 'white'
                      }}
                    >
                      {category.icon}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontSize: '0.75rem', textAlign: 'center', fontWeight: 500 }}>
                      {category.name}
                    </Typography>
                  </CategoryCard>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </AnimatedBox>

        {/* Featured Products */}
        <AnimatedBox sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
            Популярні товари
          </Typography>
          <Grid container spacing={3}>
            {featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard onClick={() => navigate(`/products/${product.id}`)}>
                  <Box sx={{ position: 'relative' }}>
                    <ImageLoader
                      src={product.image}
                      alt={product.title}
                      height={200}
                      sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                    />
                    {product.discount > 0 && (
                      <Chip
                        label={`-${product.discount}%`}
                        color="error"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      {product.title}
                    </Typography>

                    <Chip
                      label={product.category}
                      size="small"
                      sx={{ mb: 1, fontSize: '0.7rem' }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Rating value={product.rating} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        ({product.reviews})
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {product.seller}
                    </Typography>

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

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<ShoppingCart />}
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        В кошик
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FavoriteIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <FavoriteIcon />
                      </Button>
                    </Stack>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        </AnimatedBox>

        {/* Popular Searches */}
        <AnimatedBox sx={{ mb: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
              Що шукають
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {popularSearches.slice(0, 20).map((search, index) => (
                <Chip
                  key={index}
                  label={search}
                  variant="outlined"
                  clickable
                  onClick={() => navigate(`/products?search=${encodeURIComponent(search)}`)}
                  sx={{
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                  }}
                />
              ))}
            </Box>
          </Paper>
        </AnimatedBox>

        {/* Call to Action */}
        <AnimatedBox>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Почніть продавати на Prom вже сьогодні
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Приєднуйтесь до тисяч продавців та досягайте успіху разом з нами
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<LocalOffer />}
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: 'white',
                color: '#f59e0b',
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: '#f8fafc',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Стати продавцем
            </Button>
          </Paper>
        </AnimatedBox>
      </Container>
    </Box>
  );
};

export default HomePage; 