import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  List,
  ListItem,
  Divider,
  Chip,
  Avatar,
  Stack,
  styled,
} from '@mui/material';
import {
  QrCode2,
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  LinkedIn,
} from '@mui/icons-material';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8fafc',
  borderTop: '1px solid #e2e8f0',
  padding: theme.spacing(4, 0),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#64748b',
  textDecoration: 'none',
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: '#2563eb',
  },
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#e2e8f0',
  color: '#64748b',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#2563eb',
    color: 'white',
    transform: 'translateY(-2px)',
  },
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer component="footer">
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Покупцям */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Покупцям
            </Typography>
            <List dense sx={{ p: 0 }}>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Довідка для покупців
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Пром-підтримка
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Акційні пропозиції
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Що таке «Купити з Prom»
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Як купувати з Пром-оплатою
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Рекомендації щодо безпечних покупок
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Перевірка на належність сайту до платформи prom.ua
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Каталог запчастин
                </FooterLink>
              </ListItem>
            </List>
          </Grid>

          {/* Продавцям */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Продавцям
            </Typography>
            <List dense sx={{ p: 0 }}>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Довідка для продавців
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Створити інтернет-магазин на Prom
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Просування в Каталозі ProSale
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Sprava.prom — медіа для підприємців
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Користувацька угода
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Політика конфіденційності
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Правила роботи на маркетплейсі
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Бонусна програма електронний маркетплейс PROM
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Керівництво Google Ads
                </FooterLink>
              </ListItem>
            </List>
          </Grid>

          {/* О нас */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Про нас
            </Typography>
            <List dense sx={{ p: 0 }}>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Про prom.ua
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Робота в prom.ua
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Контактна інформація
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Захист прав на контент
                </FooterLink>
              </ListItem>
            </List>
          </Grid>

          {/* Партнери та соціальні мережі */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Партнери
            </Typography>
            <List dense sx={{ p: 0, mb: 3 }}>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Volonter by Prom
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Bigl.ua
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Shafa
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Kabanchik.ua
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Вчасно
                </FooterLink>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FooterLink href="#" variant="body2">
                  Zakupivli.pro
                </FooterLink>
              </ListItem>
            </List>

            {/* Mobile App QR Code */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                Відскануй QR-код, щоб завантажити мобільний додаток
              </Typography>
              <Box sx={{
                width: 100,
                height: 100,
                backgroundColor: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mt: 1,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: '#2563eb',
                  transform: 'scale(1.05)',
                }
              }}>
                <QrCode2 sx={{ fontSize: 60, color: '#64748b' }} />
              </Box>
            </Box>

            {/* Social Media */}
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
                Слідкуйте за нами
              </Typography>
              <Stack direction="row" spacing={1}>
                <SocialIcon>
                  <Facebook />
                </SocialIcon>
                <SocialIcon>
                  <Twitter />
                </SocialIcon>
                <SocialIcon>
                  <Instagram />
                </SocialIcon>
                <SocialIcon>
                  <YouTube />
                </SocialIcon>
                <SocialIcon>
                  <LinkedIn />
                </SocialIcon>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom section */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            © prom.ua, 2008-2025
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Тема - Світла
            </Typography>
            <Chip
              label="BETA"
              size="small"
              color="primary"
              sx={{
                fontWeight: 600,
                backgroundColor: '#2563eb',
                color: 'white',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Українська
            </Typography>
          </Stack>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 