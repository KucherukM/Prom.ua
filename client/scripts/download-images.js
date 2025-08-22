const https = require('https');
const fs = require('fs');
const path = require('path');

// Функція для завантаження зображення
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          console.log(`✅ Завантажено: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Створення папок якщо не існують
const dirs = [
  'public/images/products',
  'public/images/categories', 
  'public/images/banners'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Створено папку: ${dir}`);
  }
});

// Список зображень для завантаження
const images = [
  // Продукти
  {
    url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    filename: 'iphone-15-pro.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    filename: 'samsung-galaxy-s24.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    filename: 'macbook-air-m2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    filename: 'sony-wh1000xm5.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    filename: 'nike-air-max-270.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    filename: 'canon-eos-r6.jpg'
  },
  
  // Категорії
  {
    url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
    filename: 'beauty-health.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    filename: 'home-garden.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    filename: 'clothing-shoes.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop',
    filename: 'electronics.jpg'
  },
  
  // Баннери
  {
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
    filename: 'school-discounts.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    filename: 'installment-payment.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=400&fit=crop',
    filename: 'vyshyvanka-discounts.jpg'
  }
];

// Завантаження всіх зображень
async function downloadAllImages() {
  console.log('🚀 Початок завантаження зображень...\n');
  
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const filepath = path.join(__dirname, '..', 'public', 'images', 
      image.filename.includes('banner') ? 'banners' : 
      image.filename.includes('category') ? 'categories' : 'products', 
      image.filename
    );
    
    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.error(`❌ Помилка завантаження ${image.filename}:`, error.message);
    }
    
    // Невелика затримка між завантаженнями
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n🎉 Завантаження завершено!');
}

// Запуск скрипта
downloadAllImages().catch(console.error);
