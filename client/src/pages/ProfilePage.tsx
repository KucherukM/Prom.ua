import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Person as PersonIcon, ShoppingBag as OrdersIcon, Favorite as WishlistIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Використовуємо дані з AuthContext
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    username: user?.username || '',
    phoneNumber: user?.phoneNumber || '',
    pictureUrl: user?.pictureUrl || '',
  });

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Доставлено',
      total: 78998,
      items: [
        { title: 'iPhone 15 Pro', price: 45999, quantity: 1 },
        { title: 'Samsung Galaxy S24', price: 32999, quantity: 1 },
      ],
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'В дорозі',
      total: 12999,
      items: [
        { title: 'Sony WH-1000XM5', price: 12999, quantity: 1 },
      ],
    },
  ];

  const wishlist = [
    {
      id: 1,
      title: 'MacBook Air M2',
      price: 42999,
      image: 'https://via.placeholder.com/100x100?text=MacBook',
    },
    {
      id: 2,
      title: 'AirPods Pro',
      price: 8999,
      image: 'https://via.placeholder.com/100x100?text=AirPods',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      username: user?.username || '',
      phoneNumber: user?.phoneNumber || '',
      pictureUrl: user?.pictureUrl || '',
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');

      const updatedUser = await apiService.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber || undefined,
        pictureUrl: formData.pictureUrl || undefined
      });

      // Update user in context
      setUser(updatedUser);

      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Помилка оновлення профілю');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      username: user?.username || '',
      phoneNumber: user?.phoneNumber || '',
      pictureUrl: user?.pictureUrl || '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ ...prev, pictureUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Доставлено':
        return 'success';
      case 'В дорозі':
        return 'warning';
      case 'Обробляється':
        return 'info';
      default:
        return 'default';
    }
  };

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Завантаження профілю...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Профіль користувача
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={user.pictureUrl}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                bgcolor: user.pictureUrl ? 'transparent' : 'primary.main',
                border: user.pictureUrl ? '3px solid #e2e8f0' : 'none',
              }}
            >
              {!user.pictureUrl && (
                <Typography variant="h4">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </Typography>
              )}
            </Avatar>

            <Typography variant="h5" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              @{user.username}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>

            {!isEditing && (
              <Button
                variant="outlined"
                onClick={handleEdit}
                sx={{ mt: 2 }}
              >
                Редагувати профіль
              </Button>
            )}
          </Paper>
        </Grid>

        {/* Profile Content */}
        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Особисті дані" />
              <Tab label="Замовлення" />
              <Tab label="Бажані товари" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Ім'я"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Прізвище"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Grid>

                  {isEditing && (
                    <Grid item xs={12}>
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Avatar
                          src={formData.pictureUrl}
                          sx={{
                            width: 100,
                            height: 100,
                            mx: 'auto',
                            mb: 2,
                            bgcolor: formData.pictureUrl ? 'transparent' : 'primary.main',
                            border: formData.pictureUrl ? '3px solid #e2e8f0' : 'none',
                          }}
                        >
                          {!formData.pictureUrl && (
                            <Typography variant="h5">
                              {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                            </Typography>
                          )}
                        </Avatar>
                        <input
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="image-upload"
                          type="file"
                          onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload">
                          <Button
                            variant="outlined"
                            component="span"
                            startIcon={<PersonIcon />}
                          >
                            Змінити фото
                          </Button>
                        </label>
                      </Box>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Логін"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Телефон"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </Grid>
                </Grid>

                {isEditing && (
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={20} /> : 'Зберегти'}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Скасувати
                    </Button>
                  </Box>
                )}
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Історія замовлень
              </Typography>

              {orders.map((order) => (
                <Card key={order.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Замовлення {order.id}
                      </Typography>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status) as any}
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Дата: {order.date}
                    </Typography>

                    <Typography variant="h6" color="primary" gutterBottom>
                      Всього: {order.total.toLocaleString()} ₴
                    </Typography>

                    <List dense>
                      {order.items.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={item.title}
                            secondary={`${item.price.toLocaleString()} ₴ × ${item.quantity}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Бажані товари
              </Typography>

              <Grid container spacing={2}>
                {wishlist.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {item.title}
                        </Typography>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          {item.price.toLocaleString()} ₴
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 1 }}
                        >
                          Додати в кошик
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage; 