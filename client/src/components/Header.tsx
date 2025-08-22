import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  alpha,
  styled,
  InputBase,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Notifications,
  Favorite,
  AccountCircle,
  KeyboardArrowDown,
  LocalShipping,
  Payment,
  Security,
  Help,
  Home,
  Category,
  LocalOffer,
  Star,
  Logout,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Стилізовані компоненти
const SearchBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8fafc',
  borderBottom: '1px solid #e2e8f0',
  padding: theme.spacing(0.5, 0),
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState<null | HTMLElement>(null);

  const categories = [
    { name: 'Краса та здоров\'я', icon: <Star /> },
    { name: 'Дім та сад', icon: <Home /> },
    { name: 'Одяг та взуття', icon: <Category /> },
    { name: 'Техніка та електроніка', icon: <Category /> },
    { name: 'Товари для дітей', icon: <Category /> },
    { name: 'Авто - мото', icon: <Category /> },
    { name: 'Подарунки, хобі, книги', icon: <Category /> },
    { name: 'Аксесуари та прикраси', icon: <Category /> },
    { name: 'Матеріали для ремонту', icon: <Category /> },
    { name: 'Спорт та відпочинок', icon: <Category /> },
    { name: 'Медикаменти та медичні товари', icon: <Category /> },
    { name: 'Зоотовари', icon: <Category /> },
    { name: 'Інтимні товари', icon: <Category /> },
    { name: 'Канцтовари', icon: <Category /> },
    { name: 'Спецодяг та взуття', icon: <Category /> },
    { name: 'Весільні товари', icon: <Category /> },
    { name: 'Продукти харчування, напої', icon: <Category /> },
    { name: 'Воєнторг', icon: <Category /> },
    { name: 'Інструмент', icon: <Category /> },
    { name: 'Антикваріат та колекціонування', icon: <Category /> },
    { name: 'Будівництво', icon: <Category /> },
    { name: 'Товари для бізнесу', icon: <Category /> },
    { name: 'Послуги', icon: <Category /> },
    { name: 'Енергопостачальні прилади', icon: <Category /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleCategoryMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryMenuAnchor(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryMenuAnchor(null);
  };

  return (
    <>
      {/* Top bar */}
      <TopBar>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              © prom.ua, 2008-2025
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                color="inherit"
                startIcon={<LocalShipping />}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Відстеження замовлення
              </Button>
              <Button
                size="small"
                color="inherit"
                startIcon={<Payment />}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Пром-оплата
              </Button>
              <Button
                size="small"
                color="inherit"
                startIcon={<Security />}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Безпека
              </Button>
            </Stack>
          </Box>
        </Container>
      </TopBar>

      {/* Main header */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: 0, py: 1 }}>
            {/* Logo */}
            <Typography
              variant="h4"
              component="div"
              sx={{
                cursor: 'pointer',
                flexGrow: 0,
                mr: 3,
                fontWeight: 700,
                color: '#2563eb',
                '&:hover': {
                  color: '#1d4ed8',
                }
              }}
              onClick={() => navigate('/')}
            >
              prom.ua
            </Typography>

            {/* Search */}
            <SearchBox>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <form onSubmit={handleSearch}>
                <StyledInputBase
                  placeholder="Знайти товари..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </SearchBox>

            {/* Category Button */}
            <Button
              variant="outlined"
              startIcon={<Category />}
              endIcon={<KeyboardArrowDown />}
              onClick={handleCategoryMenuOpen}
              sx={{
                mr: 2,
                borderColor: '#e2e8f0',
                color: 'text.primary',
                '&:hover': {
                  borderColor: '#2563eb',
                  backgroundColor: 'rgba(37, 99, 235, 0.04)',
                }
              }}
            >
              Каталог
            </Button>

            {/* Right side icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <IconButton
                color="inherit"
                sx={{
                  mr: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.04)',
                    color: '#2563eb'
                  }
                }}
              >
                <Badge badgeContent={0} color="error">
                  <CartIcon />
                </Badge>
              </IconButton>

              <IconButton
                color="inherit"
                sx={{
                  mr: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.04)',
                    color: '#2563eb'
                  }
                }}
              >
                <Badge badgeContent={0} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              <IconButton
                color="inherit"
                onClick={handleProfileMenuOpen}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.04)',
                    color: '#2563eb'
                  }
                }}
              >
                {isAuthenticated && user ? (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#2563eb',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </Avatar>
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Category Menu */}
      <Menu
        anchorEl={categoryMenuAnchor}
        open={Boolean(categoryMenuAnchor)}
        onClose={handleCategoryMenuClose}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 600,
            borderRadius: 2,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.06)',
          }
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <List dense>
              {categories.map((category, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => {
                    navigate(`/products?category=${encodeURIComponent(category.name)}`);
                    handleCategoryMenuClose();
                  }}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.04)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {category.icon}
                  </ListItemIcon>
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.06)',
            minWidth: 200,
          }
        }}
      >
        {isAuthenticated && user ? (
          <>
            <MenuItem disabled>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.04)',
                }
              }}
            >
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Профіль
            </MenuItem>
            <MenuItem
              onClick={() => { navigate('/cart'); handleProfileMenuClose(); }}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.04)',
                }
              }}
            >
              <ListItemIcon>
                <CartIcon fontSize="small" />
              </ListItemIcon>
              Кошик
            </MenuItem>
            <MenuItem
              onClick={() => { navigate('/favorites'); handleProfileMenuClose(); }}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.04)',
                }
              }}
            >
              <ListItemIcon>
                <Favorite fontSize="small" />
              </ListItemIcon>
              Вибране
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.04)',
                  color: '#ef4444',
                }
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Вийти
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => { navigate('/login'); handleProfileMenuClose(); }}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.04)',
                }
              }}
            >
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Увійти
            </MenuItem>
            <MenuItem
              onClick={() => { navigate('/register'); handleProfileMenuClose(); }}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.04)',
                }
              }}
            >
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Зареєструватися
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default Header; 